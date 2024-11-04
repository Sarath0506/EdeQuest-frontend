import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/dashboard/enrolled-courses');
        }
    }, [shouldNavigate, navigate]);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, dispatch, setShouldNavigate);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white space-y-6">
            <div className="flex justify-between items-center text-lg font-semibold">
                <p>Total:</p>
                <p className="text-yellow-400">₹{total}</p>
            </div>
            <button
                onClick={handleBuyCourse}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
            >
                Buy Now
            </button>
        </div>
    );
};

export default RenderTotalAmount;
