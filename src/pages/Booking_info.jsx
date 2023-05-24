import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityByID } from "../api/activities";
import { getClassByActivityID } from "../api/classes";
import { getStaffByID } from "../api/staff";
import { getBookingByClassID, createBooking } from "../api/bookings";
import { getRoomByID } from "../api/rooms";
import { useAuthentication } from "../hooks/authentication"
import Nav from "../components/Nav";
import Footer from '../components/Footer.jsx';
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom"
import ToolBar from '../components/ToolBar'


export default function BookingInfo() {
    const navigate = useNavigate()
    const [user] = useAuthentication()
    // console.log(user == null)
    // console.log(useAuthentication())
    const { activity_id } = useParams()
    // console.log(activity_id)
    const [activity, setActivity] = useState([]);
    // console.log(activity)
    useEffect(() => {
        getActivityByID(activity_id).then((data) =>
            setActivity(data));

    }, [activity_id]);

    const [classData, setClassData] = useState([]);
    // console.log(classData)
    useEffect(() => {
        if (user) {
            getClassByActivityID(activity_id).then((data) =>
            setClassData(data)
            // console.log(data)
            );
        }
  
    }, [activity_id]);

    const [room, setRoom] = useState([]);
    // console.log(room)
    useEffect(() => {
        // console.log(classData)
        getRoomByID(classData.class_room_id).then((data) =>
        
            setRoom(data));
    }, [classData.class_room_id]);
    const [staff, setStaff] = useState([]);
    // console.log(staff)
    useEffect(() => {
    // console.log(classData.class_trainer_user_id)

        getStaffByID(classData.class_trainer_user_id).then((data) =>
        // console.log(data)
            setStaff(data)
            );
         
    }, [classData.class_trainer_user_id]);

    const [booking, setBooking] = useState([]);
    // console.log(booking)
    useEffect(() => {
        getBookingByClassID(classData.class_id).then((data) =>
            // console.log(class),
            setBooking(data));
    }, [classData.class_id]);

    return <div className="flex flex-col min-h-screen">
        <Nav />
        <ToolBar className = "block md:hidden"></ToolBar>
        <h1 className="text-5xl font-bold my-6 text-center">Book Class</h1>

        {!user && <div className="text-4xl text-center text-amber-500 grow">Please proceed to sign in to book classes</div>}
  
        {user &&  
        <div className="w-8/12 container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2]">
                <h2 className="text-center text-4xl text-violet-500 font-bold">Activity</h2>
                {activity == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Activity Name</div>
                            <div className="stat-value">{activity.activity_name}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Description</div>
                            <div className="stat-value">{activity.activity_description}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Duration</div>
                            <div className="stat-value">{activity.activity_duration}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center text-4xl text-violet-500 font-bold">Class</h2>
                {(classData && room) == null 
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">ClassDate</div>
                            <div className="stat-value whitespace-normal">{classData.class_date}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">ClassTime</div>
                            <div className="stat-value whitespace-normal">{classData.class_time}</div>

                        </div>
                        <div className="stat">
                            <div className="stat-title">Location </div>
                            <div className="stat-value">{room.room_location}___ Room{room.room_number}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center text-4xl text-violet-500 font-bold ">User</h2>
                {user == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">First Name</div>
                            <div className="stat-value whitespace-normal">{user.staff_first_name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Last Name</div>
                            <div className="stat-value whitespace-normal">{user.staff_last_name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Phone</div>
                            <div className="stat-value whitespace-normal">{user.staff_phone}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center text-4xl text-violet-500 font-bold">Trainer</h2>
                {staff == null
                    ? <Spinner/>
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">First Name</div>
                            <div className="stat-value whitespace-normal">{staff.staff_first_name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Last Name</div>
                            <div className="stat-value whitespace-normal">{staff.staff_last_name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Phone</div>
                            <div className="stat-value whitespace-normal">{staff.staff_phone}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="my-2">

                <button className="btn btn-primary mr-2"
                    onClick={() => {
                            createBooking({
                                booking_user_id: user.staff_id.toString(),
                                booking_class_id: classData.class_id.toString(),
                            }).then((createdBooking) => {
                                // console.log(createdBooking)
                                navigate("/user_booking");
                            });
                        }
                    }>Booking</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => 
                            navigate("/class_booking")
                    }>Back</button>
                <label className="label">
                    {/* <span className="label-text-alt">{statusMessage}</span> */}
                </label>
            </div>
        </div>
        }
        <Footer />
    </div>
}