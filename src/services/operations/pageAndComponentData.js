import React from 'react';
import toast from "react-hot-toast";
import { apiConnector } from '../apiConnector';
import { catalogdata } from '../api';

export const getCatalogpageDetails = async (categoryId) => {
    console.log("categoryId.........", categoryId); // Check if categoryId is valid at the start

    const toastId = toast.loading("Loading.....");
    let result = [];

    if (!categoryId) {
        console.error("categoryId is undefined or invalid.");
        toast.error("Invalid category ID.");
        toast.dismiss(toastId);
        return result;
    }

    try {
        const response = await apiConnector("POST", catalogdata.CATALOGPAGEDATA_API, { categoryId });

        if (!response) {
            throw new Error("Could not fetch category data.");
        }

        result = response?.data;
    } catch (error) {
        console.log("CATALOG PAGE DATA ERROR........", error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId);
    return result;
};

