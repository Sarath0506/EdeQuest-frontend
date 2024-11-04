import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories, editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipTag from './ChipTag';
import RequirmentField from './RequirmentField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import UploadImage from './UploadImage';

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { step } = useSelector((state) => state.course);

  useEffect(() => {
    const getCategories = async () => {
      try {
        console.log("course:", course);
        setLoading(true);
        const categories = await fetchCourseCategories();
        console.log("Fetched categories:", categories); // Log categories
  
        if (categories.length > 0) {
          setCourseCategory(categories);
        }
      } catch (error) {
        console.error("Failed to load categories:", error); // Log fetch error
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
  
    if (editCourse) {
  
      // Set form values based on course details
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatWillYouLearn);
      setValue("courseRequirements", course.instructions);
      setValue("courseThumbnail", course.thumbnail);
      setValue("courseCategory", course.category._id);
    }
  
    getCategories();
  }, [editCourse, course]);
  
  const isFormUpdated = () => {
    const currentValues = getValues();
  
    if (!course) {
      console.warn("No course or course details found");
      return false;
    }
  
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.courseBenefits !== course.whatWillYouLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseThumbnail !== course.thumbnail
    );
  };
  

  const onSubmit = async (data) => {
    console.log("Form submission data:", data);
    if (!data.courseTags || data.courseTags.length === 0) {
      toast.error("At least one tag is required");
      return;
    }

    if (!data.courseRequirements || data.courseRequirements.length === 0) {
      toast.error("At least one instruction is required");
      return;
    }

    if (!data.courseThumbnail) {
      toast.error("Please upload a course thumbnail");
      return;
    }

    // Updating existing course
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formdata = new FormData();

        formdata.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formdata.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formdata.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.Price) {
          formdata.append("Price", data.coursePrice);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formdata.append("category", data.courseCategory);
        }
        if (currentValues.courseBenefits !== course.whatWillYouLearn) {
          formdata.append("whatWillYouLearn", data.courseBenefits);
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formdata.append("instructions", JSON.stringify(data.courseRequirements));
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formdata.append("tag", JSON.stringify(data.courseTags));
        }
        if (data.courseThumbnail && typeof data.courseThumbnail === 'object') {
          formdata.append("thumbnail", data.courseThumbnail);
        }

        setLoading(true);
        const result = await editCourseDetails(formdata, token);
        console.log("result/.........",result)
        setLoading(false);
        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
        
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // Creating new course

    if (!data.courseTitle || !data.courseShortDesc || !data.coursePrice || !data.courseCategory || !data.courseBenefits || !data.courseRequirements) {
      toast.error("All fields are required");
      return;
    }


    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatWillYouLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
   
    if (data.courseThumbnail && typeof data.courseThumbnail === 'object') {
      formData.append("thumbnail", data.courseThumbnail);
    }

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    console.log("result.........", result);
    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-gray-900 bg-gray-800 p-6 space-y-8'
      >
        <div>
          <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", { required: true })}
            className='w-full text-black'
          />
          {errors.courseTitle && (
            <span className='text-red-500'>Course Title is Required</span>
          )}
        </div>

        <div>
          <label htmlFor='courseShortDesc'>Course Short Description <sup>*</sup></label>
          <textarea
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc", { required: true })}
            className='w-full min-h-[140px] text-black'
          />
          {errors.courseShortDesc && (
            <span className='text-red-500'>Course Description is Required</span>
          )}
        </div>

        <div className='relative'>
          <label htmlFor='coursePrice'>Course Price <sup>*</sup></label>
          <input
            id='coursePrice'
            placeholder='Enter Price'
            type='number'
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className='w-full text-black'
          />
          <HiOutlineCurrencyRupee className='absolute top-1/2 text-gray-800' />
          {errors.coursePrice && (
            <span className='text-red-500'>Course Price is Required</span>
          )}
        </div>

        <ChipTag
          name="courseTags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          placeholder="Enter tags"
          getValues={getValues}
        />

        <UploadImage
          name="courseThumbnail"
          label="Upload Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          placeholder="Upload thumbnail"
        />

        <div>
          <label htmlFor='courseBenefits'>What You Will Learn</label>
          <textarea
            id='courseBenefits'
            placeholder='Enter Benefits'
            {...register("courseBenefits", { required: true })}
            className='w-full min-h-[140px] text-black'
          />
          {errors.courseBenefits && (
            <span className='text-red-500'>Benefits of the course are required</span>
          )}
        </div>

        <div>
          <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
          <select
            id="courseCategory"
            {...register('courseCategory', { required: true })}
            className="w-full text-black"
          >
            <option value="" disabled>Select Category</option>
            {courseCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.courseCategory && (
            <span className="text-red-500">Category is required</span>
          )}
        </div>


        <RequirmentField
          name="courseRequirements"
          label="CourseRequirements"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className='flex'>

          {
            editCourse && (
              <button
              onClick={()=>dispatch(setStep(2))}
              >
                Continue without saving
              </button>
            )


          }
          <button
            type='submit'
            className='w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700'
            disabled={loading}
          >
            {editCourse ? "Update Course" : "Add Course"}
          </button>
        </div>

        
      </form>
    </div>
  );
};

export default CourseInformationForm;
