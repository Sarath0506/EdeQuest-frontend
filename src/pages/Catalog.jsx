import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { getCatalogpageDetails } from '../services/operations/pageAndComponentData';
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const categoryData = res?.data?.data?.filter((ct) => 
                    ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0];
                
                if (categoryData?._id) {
                    setCategoryId(categoryData._id);
                } else {
                    setError("Category not found");
                }
            } catch (error) {
                setError("Error fetching categories");
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        if (!categoryId) return;

        const categoryPageDetails = async () => {
            setLoading(true);
            try {
                const res = await getCatalogpageDetails(categoryId);
                setCatalogPageData(res);
                
            } catch (error) {
                setError("Error fetching catalog page details");
            } finally {
                setLoading(false);
            }
        };
        categoryPageDetails();
    }, [categoryId]);

    const allDifferentCategoryCourses = catalogPageData?.data?.differentCategories?.flatMap(category => category.courses) || [];

    if (loading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        
        <div className="text-white container mx-auto py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-400 mb-4">
                <p>{`Home / Catalog / `}<span className="text-gray-100">{catalogPageData?.data?.selectedCategory?.name}</span></p>
                
            </div>

            {/* Page Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">{catalogPageData?.data?.selectedCategory?.name}</h1>
                <p className="text-lg text-gray-300 mt-2">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>

            {/* Course sections */}
            <div>
                {/* Courses to Get Started */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Courses to Get Started</h2>
                    <div className="flex gap-x-4 mb-6">
                        <p className="cursor-pointer hover:underline">Most Popular</p>
                        <p className="cursor-pointer hover:underline">New</p>
                    </div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
                    
                </div>

                {/* Top Courses in Category */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Top Courses in {catalogPageData?.data?.selectedCategory?.name}</h2>
                    <CourseSlider courses={allDifferentCategoryCourses} />
                </div>

                {/* Frequently Bought Courses */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Frequently Bought</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catalogPageData?.data?.mostSellingCourses?.map((course, index) => (
                            <Course_Card course={course} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
