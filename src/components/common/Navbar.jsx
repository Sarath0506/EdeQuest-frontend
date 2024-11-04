import React, { useEffect, useState } from 'react'
import { matchPath, NavLink } from 'react-router-dom'
import EQ_logo from '../../assets/EQ_Logo.png';
import { NavbarLinks } from '../../data/Nav-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidDownArrowCircle } from "react-icons/bi";
import ProfileDropDown from '../core/Auth/ProfileDropDown'; 
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const location = useLocation();

    const [subLinks,setSubLinks] = useState([])

    const fetchSublinks = async ()=>{

        try{
            const result =  await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.data);

        }
        catch(error){
            console.log("cannot fetch the category list")
        }

    }

    useEffect (()=>{
        fetchSublinks();
    },[])



    const match = (route)=>{
        return matchPath ({path:route},location.pathname);
    }

  return (
    <div className='flex items-center justify-center border-b-[1px] border-gray-600 h-[60px]'>

        <div className='w-11/12 flex items-center justify-around'>

            <NavLink to={'/'} className='flex items-center gap-2'>
                <img src={EQ_logo} className='w-10 h-10 rounded-full' alt="EduQuest logo" />
                <p className='font-bold text-3xl text-yellow-400'>EduQuest</p>
            </NavLink>

            <nav>
                <ul className='flex gap-x-6 text-white'>
                    {
                        NavbarLinks.map((element,index)=>(
                            <li key={index}>
                                {element.title ==="Catalog"? 
                                (
                                    <div className='flex gap-2 items-center group relative z-10'>
                                        {element.title}
                                        <BiSolidDownArrowCircle />

                                        <div className='invisible p-2 absolute left-[50%] top-[.1%] translate-x-[-50%] translate-y-[35%] flex flex-col rounded-md bg-white text-gray-800 opacity-0 
                                                        transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]'>

                                            <div className='absolute left-[50%] top-[0] h-6 w-6 rotate-45 rounded bg-white translate-x-[80%] translate-y-[-30%]'>
                                            </div>
                                            {
                                                subLinks.map((element,index)=>(

                                                    <NavLink 
                                                    to={`/catalog/${element.name.split(" ").join("-").toLowerCase()}`}
                                                    key={index}>
                                                        <button>
                                                            {element.name}
                                                        </button>
                                                    </NavLink>

                                                ))
                                            }

                                        </div>

                                    </div>
                                )
                                :
                                (
                                    <NavLink to={element?.path}>
                                        <p className= {`${match(element?.path)? "text-yellow-600":"text-white"}`} >
                                            {element.title}
                                        </p>                                        
                                    </NavLink>
                                )
                                }                              
                            </li>
                            
                        ))
                    }
                </ul>
            </nav>

            <div className='flex gap-x-4 items-center text-white'>
                {
                    user && user.accountType!='Instructor' &&
                    (
                        <NavLink to="dashboard/cart" className='relative'>
                            <FaCartShopping className="text-2xl"/>
                            {
                                totalItems>0 && ( <span className="absolute -top-0.5 -right-2 bg-yellow-500 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>)
                            }
                        </NavLink>
                    )
                }
                {
                    token === null &&
                    (
                        <NavLink to='/login' className='border border-gray-700 bg-gray-700 rounded-md py-[6px] px-[8px] text-gray-400'>
                            <button>
                                Login 
                            </button>                           
                        </NavLink>                       
                    )
                }
                {
                    token === null &&
                    (
                        <NavLink to='/signUp' className='border border-gray-700 bg-gray-700 rounded-md py-[6px] px-[8px] text-gray-400'>
                            <button>
                                Sign up 
                            </button>                           
                        </NavLink>                       
                    )
                }
                {
                    token !== null &&
                    (
                        <ProfileDropDown/>  
                    )  
                }
                
            </div>


        </div>


    </div>
  )
}

export default Navbar