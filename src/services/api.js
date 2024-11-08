const BASE_URL = process.env.REACT_APP_BASE_URL

//Auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL+"/auth/signup",  
    LOGIN_API: BASE_URL + "/auth/login",   
    RESETPASSWORDTOKEN_API: BASE_URL+ "/auth/reset-password-token",   
    RESETPASSWORD_API: BASE_URL+"/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_ALL_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/instructorDashboard"
}
    
//STUDENTS ENDPOINTS   
export const studentEndpoints = {   
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",

} 

// COURSE ENDPOINTS    
export const courseEndpoints = {   
    GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategory",
    CREATE_COURSE_API: BASE_URL+"/course/createCourse",
    CREATE_SECTION_API: BASE_URL+"/course/createSection",
    CREATE_SUBSECTION_API: BASE_URL+"/course/createSubSection",
    UPDATE_SECTION_API: BASE_URL+"/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL +"/course/getInstructorCourses",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL +"/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL +"/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating"
}

//RATING AND REVIEW API
export const ratingEndpoints = {
    REVIEW_DETAILS_API :BASE_URL+ "/course/getReviews"
}

//CATEGORIES API
export const categories = {
    CATEGORIES_API:BASE_URL+"/course/showAllCategory"
};

//CATALOG PAGE DATA
export const catalogdata = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDetails",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contactUs",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}




