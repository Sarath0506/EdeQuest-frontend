import toast from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser} from '../../slices/profileSlice'
import { apiConnector } from "../apiConnector" 
import {endpoints} from '../api'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = endpoints

export function sendOTP(email,navigate) {
    return async (dispatch)=>{
        const toastId = toast.loading("loading....")
            dispatch(setLoading(true))
        try{   
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            console.log("SENDOTP API RESPONSE......", response);
            console.log(response.data.success);
            toast.success("OTP Sent successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR........",error);
            toast.error("Failed to sent OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    confirmPassword,
    password,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                confirmPassword,
                password,
                otp
            });
            console.log("Login response........",response)
            toast.success("Login successful")
            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP API Error.........",error)
            toast.error("Signup failed")
            navigate("/signUp")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password
            })
            console.log("Login response........",response)
            toast.success("Login successful")
            dispatch(setToken(response.data.token));
            const userImage= response.data?.user?.image 
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}))
            console.log("user details.....", response.data.user);
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("Login API Error.........",error)
            toast.error("Login failed")
            navigate("/login")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
    
}

export function logout(navigate){
    return(dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logget out")
        navigate("/login")
    }
}

export function getPasswordResetToken(email,setEmailSend){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSWORDTOKEN_API,{email})
            console.log("Reset password toke.....",response)
            toast.success("RESET EMAIL SEND")
            setEmailSend(true);
        }
        catch(error){
            console.log("Reset password token error",error)
            toast.error("Reset password link failed")

        }
        dispatch(setLoading(false));   
    }
}

export function passwordUpdate(password, confirmPassword, resetToken) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                resetToken
            });
            if (!response.data.success) {
                throw new Error(response.data.success)
            } 
            console.log("PASSWORD UPDATE SUCCESSFUL:", response);
            toast.success("Password updated successfully");
        } catch (error) {
            console.log("ERROR WITH PASSWORD UPDATE:", error);
            toast.error("Failed to update password");
        }
        dispatch(setLoading(false));
    };
}
