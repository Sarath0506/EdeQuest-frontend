import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: thumbnailImage,
        price: currentPrice,
        studentsEnrolled,
        instructions,
    } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course.");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
            <img src={thumbnailImage} alt="thumbnail" className="max-h-60 w-full object-cover rounded-lg" />

            <div className="text-2xl font-bold text-green-400">
                Rs. {currentPrice}
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={user && studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition duration-200"
                >
                    {user && studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"}
                </button>

                {!studentsEnrolled.includes(user?._id) && (
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-semibold transition duration-200"
                    >
                        Add to Cart
                    </button>
                )}
            </div>

            <p className="text-sm text-gray-400">30-day money-back guarantee</p>

            <div>
                <p className="font-semibold text-lg">This course includes:</p>
                <ul className="flex flex-col gap-2 mt-2">
                    {instructions?.map((instruct, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                            <span className="text-green-400">•</span> {instruct}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={handleShare}
                className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition duration-200"
            >
                Share
            </button>
        </div>
    );
}

export default CourseDetailsCard;
