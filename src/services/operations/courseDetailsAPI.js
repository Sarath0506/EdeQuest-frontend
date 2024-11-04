import toast from "react-hot-toast";
import { courseEndpoints } from "../api";
import { apiConnector } from "../apiConnector";



const {

    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API, 
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API,

} = courseEndpoints

export const showAllCourses = async()=>{
    const toastId = toast.loading("Loading...")
    let result =[]
    try{
        const response  = await apiConnector("GET",GET_ALL_COURSE_API,null)
        if(!response?.data?.success){
            throw new Error ("could not fetch all course details")
        }
        result=response?.data?.data

    }
    catch(error){
        console.error("Get_ALL_COURSE_API ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseDetails =async(courseId)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("GET",COURSE_DETAILS_API,{courseId})
        console.log("COURSE_DETAILS_API............",response)
        if(!response?.data?.success){
            throw new Error ("could not fetch course details")
        }
        result=response?.data

    }
    catch(error){
        console.log("COURSE_DETAILS_API ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseCategories = async () => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
      const response = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API, null);
  
      if (!response || !response.data || !response.data.success) {
        throw new Error("Could not fetch course categories");
      }
      result = response.data.data || []; // Ensure result is always an array
  
    } catch (error) {
      console.log("COURSE_CATEGORIES_API ERROR:", error);
      toast.error(error.message || "An error occurred while fetching categories");
    }
    toast.dismiss(toastId);
    return result;
};  

export const addCourseDetails =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",CREATE_COURSE_API,data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("CREATE_COURSE_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not create course details")
        }
        toast.success("COURSE DETAILS ADDED SUCCESSFULLY")

        result=response?.data.data

    }
    catch(error){
        console.log("CREATE_COURSE_API, ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",EDIT_COURSE_API,data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("EDIT_COURSE_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not update course details")
        }
        toast.success("COURSE DETAILS EDITED SUCCESSFULLY")

        result=response?.data?.data

    }
    catch(error){
        console.log("EDIT_COURSE_API........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",CREATE_SECTION_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("CREATE_SECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not create section")
        }

        result=response?.data?.updatedCourse

    }
    catch(error){
        console.log("CREATE_COURSE_API, ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",CREATE_SUBSECTION_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("CREATE_SUBSECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not create subSection")
        }

        result=response?.data?.data

    }
    catch(error){
        console.log("CREATE_SUBSECTION_API, ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",UPDATE_SECTION_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("UPDATE_SECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not UPDATE section")
        }

        result=response?.data?.data

    }
    catch(error){
        console.log("UPDATE_SECTION_API, ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSubSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{
        const response  = await apiConnector("POST",UPDATE_SUBSECTION_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("UPDATE_SubSECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not UPDATE subsection")
        }

        result=response?.data?.data

    }
    catch(error){
        console.log("UPDATE_SubSECTION_API, ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{

        const url = `${DELETE_SECTION_API}/${data.sectionId}`;

        const response  = await apiConnector("DELETE",url,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("DELETE_SECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not DELETE section")
        }
        //need to verify
        result=response?.data?.data

    }
    catch(error){
        console.log("DELETE_SECTION_API ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubSection =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null
    try{

        const url = `${DELETE_SUBSECTION_API}/${data.subSectionId}`;


        const response  = await apiConnector("DELETE",url,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("DELETE_SUBSECTION_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not DELETE subsection")
        }
        //need to verify
        toast.success("Leacture deleted")
        result=response?.data?.data

    }
    catch(error){
        console.log("DELETE_SUBSECTION_API ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchInstructorCourses =async(token)=>{
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response  = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("GET_ALL_INSTRUCTOR_COURSES_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not get instructor courses")
        }
        result=response?.data?.data

    }
    catch(error){
        console.log("GET_ALL_INSTRUCTOR_COURSES_APIERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse =async(data,token)=>{
    const toastId = toast.loading("Loading...")
    try{
        const response  = await apiConnector("DELETE",DELETE_COURSE_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("DELETE_COURSE_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not DELETE course")
        }
    
        toast.success("Course deleted")
        
    }
    catch(error){
        console.log("DELETE_COURSE_API ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

export const getFullDetails = async(courseId,token)=>{
    const toastId = toast.loading("Loading...")
    let result =null

    try{
        const url  = `${GET_FULL_COURSE_DETAILS_AUTHENTICATED}/${courseId}`;
       
        const response  = await apiConnector("GET",url,null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        if(!response?.data?.success){
            throw new Error ("could not fetch all course details")
        }
        result=response?.data?.data

    }
    catch(error){
        console.log("GET_FULL_COURSE_DETAILS ERROR........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createRatingAPI = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null

    try{
        const response = await apiConnector("POST",CREATE_RATING_API,data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("CREATE_RATING_API............",response)

        if(!response?.data?.success){
            throw new Error ("could not get rating")
        }
        result = response?.data?.data
        toast.success("Rating fetched")

    }
    catch(error){
        console.log("CREATE_RATING_API........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const markLectureAsComplete = async (data, token) => {
    let result = null;
  
    console.log("mark complete data", data);
  
    const toastId = toast.loading("Loading...");
  
    try {
      const response = await apiConnector(
        "POST",
        LECTURE_COMPLETION_API,
        data,
        { Authorization: `Bearer ${token}` }
      );
  
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API RESPONSE............", 
        response
      );
  
      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to complete lecture");
      }
  
      toast.success("Lecture Completed");
      result = true;
    } catch (error) {
      console.error("MARK_LECTURE_AS_COMPLETE_API ERROR", error);
      toast.error(error.message || "Something went wrong");
      result = false;
    } finally {
      toast.dismiss(toastId);
    }
  
    return result;
  };


