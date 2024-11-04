import { toast } from "react-hot-toast";
import {setLoading,setUser} from '../../slices/profileSlice'
import {apiConnector} from '../apiConnector'
import { endpoints, profileEndpoints, settingsEndpoints } from "../api";

const {GET_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API 
} = profileEndpoints

const {
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API
} = settingsEndpoints

const {
    RESETPASSWORDTOKEN_API
} = endpoints

export async function getEnrolledCourses(token) {
    const toastId = toast.success("loading...");
    let result = []

    try{
        const response  = await apiConnector (
            "GET",
            GET_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if (response.data.success) {
            result = response.data.data;  
            
           toast.dismiss(toastId);
           toast.success("Courses fetched successfully", { id: "success-toast" });  // Add a unique ID to prevent duplicates
        } else {
            throw new Error(response.data.message);
        }   

    }
    catch(error){
        console.error("Error fetching enrolled courses:", error);
        toast.error("Failed to load enrolled courses");
    } finally {
        toast.dismiss(toastId);
    }
    return result;
}

export function updatePicture(displayPicture,token) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading display picture...");
        dispatch(setLoading(true));
        console.log(settingsEndpoints.UPDATE_DISPLAY_PICTURE_API);

        const formData = new FormData();
        formData.append("displayPicture", displayPicture);

        try {
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            });
            console.log("Display picture update response:", response);
            if (response.data.success) {
                toast.success("Display picture updated successfully");
                dispatch(setUser(response.data.data));
            } else {
                throw new Error("Failed to update display picture");
            }
        } catch (error) {
            console.error("Error updating display picture:", error);
            toast.error("Failed to update display picture");
        }
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function updateProfile(data, token,dispatch) {
    return async(dispatch)=>{

        const toastId = toast.loading("Updating profile...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                data,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (response.data.success) {
                dispatch(setUser(response.data.updatedUserDetails));
                toast.success("Profile updated successfully");
                
            } else {
                throw new Error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }  
}

export const requestPasswordResetToken = (email, token) => async (dispatch) => {
    try {
        const response = await apiConnector(
            "POST",
            RESETPASSWORDTOKEN_API,
            { email },
            { Authorization: `Bearer ${token}` }
        );

        if (response.data.success) {
            toast.success("Password reset link sent to your email.");
        } else {
            throw new Error(response.data.message || "Failed to send password reset link.");
        }
    } catch (error) {
        console.error("Error requesting password reset:", error);
        toast.error("Failed to send password reset link.");
    }
};

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{

        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,
            { Authorization: `Bearer ${token}` }
        )
        result = response?.data?.courses;

    } catch (error) {
        console.error("GET_INSTRUCTOR_API_ERROR:", error);
        toast.error("Could not get instructoe data");
    }
    toast.dismiss(toastId);
    return result;

}
