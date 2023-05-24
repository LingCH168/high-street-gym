import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllClasses, } from "../api/classes";
import { getAllActivities, } from "../api/activities";
import Nav from "../components/Nav";
import Footer from '../components/Footer.jsx';
import ToolBar from '../components/ToolBar'

export default function User_Booking() {
    const navigate = useNavigate()
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        getAllActivities().then((data) =>
            setActivity(data)
        );
    }, []);

    const [classData, setClassData] = useState([]);
    useEffect(() => {
        getAllClasses().then((data) =>
            // console.log(class),
            setClassData(data));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Nav></Nav>
            <ToolBar></ToolBar>
            <h2 className="text-center text-4xl text-violet-500 font-bold my-8">Facility</h2>
            <div className="grow w-8/12 mb-4 mx-auto">
                <div className='flex justify-center flex-wrap gap-4 '>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_1.jpg"} 
                        alt="Badminton"
                        className='h-[550px] w-[550px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Badminton</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_2.jpg"} 
                        alt="boxing"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Boxing</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_3.jpg"} 
                        alt="roller"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Roller</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_4.jpg"} 
                        alt="gloves"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Gloves</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_5.jpg"} 
                        alt="yoga"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Yoga</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_6.jpg"} 
                        alt="abs"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >ABS</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_7.jpg"} 
                        alt="Weight"
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Weight</span>
                </figure>
                <figure className='relative group h-[400px] w-[400px] overflow-hidden'>
                    <img
                        src={"../../public/facility_8.jpg"} 
                        alt="deep squat
                        "
                        className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-50'
                    />
                    <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-cyan-500
                    hover:duration-500 hover:ease-linear'
                    >Deep Squat
                    </span>
                </figure>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
