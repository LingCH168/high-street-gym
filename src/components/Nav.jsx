import React, { useRef } from 'react'
import { Link, useLinkClickHandler, useNavigate } from 'react-router-dom'
import { useAuthentication } from "../hooks/authentication"

export default function Nav() {

    const removeOrAddDivClassRef = useRef(null);
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()
    function onLogoutClick(e) {
        logout()
        navigate("/")
    }
    const clickAddClassHandler = () => {
        if (removeOrAddDivClassRef.current) {
            removeOrAddDivClassRef.current.classList.remove('max-[1135px]:hidden');
            removeOrAddDivClassRef.current.classList.add('max-[1135px]:flex', 'max-[1135px]:fixed', 'max-[1135px]:bg-[#686973]');
        }
    }

    const clickRemoveClassHandler = () => {
        if (removeOrAddDivClassRef.current) {
            removeOrAddDivClassRef.current.classList.remove('max-[1135px]:flex', 'max-[1135px]:fixed', 'max-[1135px]:bg-[#686973]');
            removeOrAddDivClassRef.current.classList.add('max-[1135px]:hidden');
        }
    }

    return (
        <div>
            <div className={`navbar  bg-base-200  justify-between flex-wrap`}>

                {/* <div className={`navbar  bg-base-200 ${user ? 'justify-between' : 'justify-around'} flex-wrap`}> */}

                {
                    user &&
                    <a className="btn btn-ghost btn-outline border-0 normal-case text-2xl  cursor-none transition-none italic hover:bg-transparent">
                        <span className='uppercase mr-2 text-lime-500 '>
                            {user.staff_access_role}
                        </span>
                    </a>
                }
                {
                    !user &&
                    <a className="btn btn-ghost btn-outline border-0 normal-case text-2xl  cursor-none transition-none italic hover:bg-transparent">
                        <span className='uppercase mr-2 text-lime-500 '>
                            guest
                        </span>
                    </a>
                }

                <div
                    onClick={clickAddClassHandler}
                    className='h-[50px] w-[50px] flex min-[1135px]:hidden flex-col justify-between cursor-pointer'
                >
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                    <div className='h-[20%] w-[100%] bg-[#000]'></div>
                </div>

                <div
                    ref={removeOrAddDivClassRef}
                    className=' max-[1135px]:w-[100%]
                                max-[1135px]:hidden
                                max-[1135px]:flex-col
                                max-[1135px]:flex-wrap
                                max-[1135px]:justify-around
                                max-[1135px]:fixed
                                max-[1135px]:inset-0
                              max-[1135px]:bg-[#686973]
                                max-[1135px]:z-40 
                                '>

                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl" to="/facility" >Facility</Link>

                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-lg md:text-xl 0" to="/class_booking">Class</Link>

                    {
                        user && <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/user_booking">Booking</Link>
                    }

                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/blog_post_page">Blog Post</Link>

                    {/* {
                        user && (user.staff_access_role === "admin" || user.staff_access_role === "trainer") &&
                        <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl" to="/class_crud">Class CRUD </Link>
                    } */}

                    {user && (user.staff_access_role === "admin" || user.staff_access_role === "trainer") &&
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl">Class CRUD</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                                <li>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl justify-start "
                                        to="/booking">Booking</Link>
                                </li>
                                <li>
                                    <Link
                                        className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl justify-start"
                                        to="/class">Class</Link>
                                </li>
                                <li>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl justify-start"
                                        to="/activity">Activity</Link>
                                </li>
                                <li>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl justify-start"
                                        to="/room">Room</Link>
                                </li>
                                <li>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl justify-start"
                                        to="/blog_post">Post</Link>
                                </li>
                            </ul>
                        </div>
                    }


                    {
                        user && user.staff_access_role === "admin" &&
                        <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/staff">Admin</Link>
                    }
                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base md:text-xl 0" to="/join">Join US</Link>
                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/contact">Contact US</Link>
                    {
                        user
                            ? <a className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" onClick={onLogoutClick} >Logout</a>
                            : (
                                <div>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/login">Sign in</Link>
                                    <Link className="btn btn-ghost btn-outline border-0 normal-case text-base  md:text-xl 0" to="/register">Sign up</Link>
                                </div>
                            )
                    }
                </div>

            </div>
        </div>
    )
}
