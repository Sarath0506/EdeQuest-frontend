import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ReactStars from 'react-stars';
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="space-y-6">
            {cart.map((course, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-4 shadow-lg space-y-4 md:space-y-0 md:space-x-4"
                >
                    <img
                        src={course?.thumbnail}
                        alt="Course Thumbnail"
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col flex-grow space-y-2 text-white">
                        <p className="text-xl font-semibold">{course?.courseName}</p>
                        <p className="text-gray-400 text-sm">{course?.category?.name}</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-400 font-semibold">4.8</span>
                            <ReactStars
                                count={5}
                                value={4.8} // replace with actual average rating if available
                                edit={false}
                                size={20}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            />
                            <span className="text-gray-400 text-sm">({course?.ratingAndReview?.length} Ratings)</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-1 text-red-500 hover:text-red-700 transition duration-150 text-sm font-medium"
                        >
                            Remove <MdOutlineDeleteOutline className="text-lg" />
                        </button>
                        <p className="mt-2 text-lg font-semibold text-yellow-400">₹{course?.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RenderCartCourses;
