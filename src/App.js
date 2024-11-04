import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ForgetPassword } from './pages/ForgetPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs'
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Error from './pages/Error'
import Cart from './components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCourse from './components/core/Dashboard/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Settings from './components/core/Dashboard/Settings';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor'


function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className='w-screen min-h-screen bg-gray-900 flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<OpenRoute><Home/></OpenRoute>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route path="course/:courseId" element={<CourseDetails/>}/>
        <Route path="signUp" element={<SignUp/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="forgot-password" element={<ForgetPassword/>}/>
        <Route path="update-password/:id" element={<UpdatePassword/>}/>
        <Route path="verify-email" element={<VerifyEmail/>}/>
        <Route path="about" element={<AboutUs/>}/>
        <Route path="contact" element={<ContactUs/>}/>

        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>

          <Route path="dashboard/my-profile" element={<MyProfile/>}/> 
          <Route path="dashboard/settings" element={<Settings/>}/>
         
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart/>}/>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
               
              </>
            )
          } 

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              
              <>
                <Route path="dashboard/add-course" element={<AddCourse/>}/>
                <Route path="dashboard/instructor" element={<Instructor/>}/>
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
              </>
            )
          }

        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-Section/:subSectionId" element={<VideoDetails/>} />
              </>
            )
          }
        </Route>


        
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
