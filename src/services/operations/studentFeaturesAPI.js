import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import razorpayLogo from "../../assets/razorpay.logo.webp";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// Load Razorpay SDK script dynamically
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
}

// Function to initiate the course purchase process
export async function buyCourse(token, courses, userDetails, dispatch, setShouldNavigate) {
    const toastId = toast.loading("Initializing payment...");

    try {
        const razorpayLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!razorpayLoaded) {
            throw new Error("Razorpay SDK failed to load.");
        }
        console.log("Sending to capturePayment:", { courses });
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const { order } = orderResponse.data;
        console.log("Order generated:", order);

        const paymentOptions = getPaymentOptions(order, userDetails, token, dispatch, courses, setShouldNavigate);
        const razorpayObject = new window.Razorpay(paymentOptions);
        razorpayObject.open();

        razorpayObject.on("payment.failed", handlePaymentFailure);
    } catch (error) {
        console.error("Payment initialization error:", error);
        toast.error("Could not initialize payment. Please try again.");
    } finally {
        toast.dismiss(toastId);
    }
}

// Function to generate Razorpay payment options
function getPaymentOptions(order, userDetails, token, dispatch, courses, setShouldNavigate) {
    return {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: `${order.amount}`,
        currency: order.currency,
        order_id: order.id,
        name: "EduQuest",
        description: "Thank you for purchasing the course!",
        image: razorpayLogo,
        prefill: {
            name: `${userDetails.firstName}`,
            email: userDetails.email,
        },
        handler: (response) => handlePaymentSuccess(response, order, token, dispatch, courses, setShouldNavigate),
        theme: {
            color: "#3399cc",
        },
    };
}

// Handle successful payment and trigger verification
async function handlePaymentSuccess(response, order, token, dispatch, courses, setShouldNavigate) {
    try {
        console.log("Payment successful:", response);

        await sendPaymentSuccessEmail(response, order.amount, token);
        console.log("Payment success email sent.");

        console.log("Calling verifyPayment...");
        const isVerified = await dispatch(verifyPayment({ ...response, courses }, token));

        if (isVerified) {
            console.log("Payment verified! Setting navigation state.");
            setShouldNavigate(true); // Set state to trigger navigation
        }
    } catch (error) {
        console.error("Error during payment success handling:", error);
        toast.error("Something went wrong after payment. Please contact support.");
    }
}

// Handle payment failure scenario
function handlePaymentFailure(response) {
    console.error("Payment failed:", response);
    toast.error("Payment failed. Please try again.");
}

// Send payment success email to the user
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}` });
        console.log("Payment success email sent.");
    } catch (error) {
        console.error("Error sending payment success email:", error);
    }
}

// Redux thunk to verify payment
export const verifyPayment = (bodyData, token) => async (dispatch) => {
    const toastId = toast.loading("Verifying payment...");

    try {
        dispatch(setPaymentLoading(true));

        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment verified! You are now enrolled.");
        dispatch(resetCart());

        return true; // Return true to indicate successful verification
    } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Payment verification failed. Please try again.");
        return false; // Return false on failure
    } finally {
        dispatch(setPaymentLoading(false));
        toast.dismiss(toastId);
    }
};
