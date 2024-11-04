import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCouses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <p className="text-lg text-gray-400">{totalItems} {totalItems === 1 ? "Course" : "Courses"} in cart</p>

            {total > 0 ? (
                <div className="w-full max-w-2xl mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <p className="mt-10 text-xl text-yellow-500 font-semibold">Your Cart is Empty</p>
            )}
        </div>
    );
}
