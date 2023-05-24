import { useEffect, useState } from "react";
import { getActivityByID } from "../api/activities";
import { getClassByID } from "../api/classes";
import { getStaffByID } from "../api/staff";
import { deleteBookingById, getAllBookingByUserID } from "../api/bookings";
import { getRoomByID } from "../api/rooms";
import { useAuthentication } from "../hooks/authentication";
import Nav from "../components/Nav";
import Footer from "../components/Footer.jsx";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import DeleteHandler from "../components/DeleteHandler";
import ToolBar from "../components/ToolBar";

export default function BookingInfo() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = (booking) => {
    setShowConfirm(true);
    setBooking(booking);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const navigate = useNavigate();
  const [user] = useAuthentication();
  const [bookings, setBookings] = useState([]);
  // console.log(bookings)
  const [reloadBookings, setReloadBookings] = useState(false);

  useEffect(() => {
    if (user?.staff_id) {
      getAllBookingByUserID(user.staff_id).then(async (booking) => {
        if (booking === undefined) {
          setBookings([]);
        } else {
          const bookingsWithExtras = await Promise.all(
            booking.map(async (booking) => {
              // console.log(booking)
              const classData = await getClassByID(booking.booking_class_id);
              const activity = await getActivityByID(
                classData.class_activity_id
              );
              const room = await getRoomByID(classData.class_room_id);
              const staff = await getStaffByID(classData.class_trainer_user_id);
              return Promise.resolve({
                booking: booking,
                classData: classData,
                activity: activity,
                room: room,
                staff: staff,
              });
            })
          );
          setBookings(bookingsWithExtras);
          // console.log(bookingsWithExtras)
        }
      });
    }
  }, [user, reloadBookings]);

  const [booking, setBooking] = useState({});

  const deleteSelectedBooking = () => {
    // console.log(booking)
    deleteBookingById(booking)
      .then((result) => {
        setReloadBookings((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
      });
    cancelConfirmHandler();
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Nav />
      <ToolBar></ToolBar>
      {showConfirm && (
        <DeleteHandler
          onDelete={deleteSelectedBooking}
          onCancel={cancelConfirmHandler}
        ></DeleteHandler>
      )}
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">
        Your Booking
      </h1>
      {bookings.length === 0 && (
        <div className="grow ">
          <div className="text-4xl text-center text-amber-500">
            Please proceed to class page to book classes
          </div>
          <Spinner></Spinner>
        </div>
      )}
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="grow container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 w-8/12"
        >
          <div className="font-bold text-lg">
            <span className="mr-3">
              {" "}
              Time:{booking.booking.booking_created_time}
            </span>
            <span> Date:{booking.booking.booking_created_date}</span>
          </div>
          <div></div>
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-center text-4xl text-violet-500 font-bold">
              Activity
            </h2>
            {booking.activity == null ? (
              <Spinner />
            ) : (
              <div className="stats stats-vertical w-full">
                <div className="stat">
                  <div className="stat-title">Activity Name</div>
                  <div className="stat-value">
                    {booking.activity.activity_name}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Description</div>
                  <div className="stat-value">
                    {booking.activity.activity_description}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Duration</div>
                  <div className="stat-value">
                    {booking.activity.activity_duration}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-center text-4xl text-violet-500 font-bold">
              Location && Time
            </h2>
            {(booking.classData && booking.room) == null ? (
              <Spinner />
            ) : (
              <div className="stats stats-vertical w-full">
                <div className="stat">
                  <div className="stat-title">ClassDate</div>
                  <div className="stat-value whitespace-normal">
                    {booking.classData.class_date}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">ClassTime</div>
                  <div className="stat-value whitespace-normal">
                    {booking.classData.class_time}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Location </div>
                  <div className="stat-value">
                    {booking.room.room_location}___ Room
                    {booking.room.room_number}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-center text-4xl text-violet-500 font-bold ">
              User
            </h2>
            {user == null ? (
              <Spinner />
            ) : (
              <div className="stats stats-vertical w-full">
                <div className="stat">
                  <div className="stat-title">First Name</div>
                  <div className="stat-value whitespace-normal">
                    {user.staff_first_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Last Name</div>
                  <div className="stat-value whitespace-normal">
                    {user.staff_last_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Phone</div>
                  <div className="stat-value whitespace-normal">
                    {user.staff_phone}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-center text-4xl text-violet-500 font-bold">
              Trainer
            </h2>
            {booking.staff == null ? (
              <Spinner />
            ) : (
              <div className="stats stats-vertical w-full">
                <div className="stat">
                  <div className="stat-title">First Name</div>
                  <div className="stat-value whitespace-normal">
                    {booking.staff.staff_first_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Last Name</div>
                  <div className="stat-value whitespace-normal">
                    {booking.staff.staff_last_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Phone</div>
                  <div className="stat-value whitespace-normal">
                    {booking.staff.staff_phone}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 flex">
            <button className="btn btn-primary mr-2 mb-6">
              <span className="hidden md:inline">Proceed to pay</span>
              <span className="inline md:hidden">Pay</span>
            </button>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => navigate("/class_booking")}
            >
              Back
            </button>
            <button
              className="btn btn-warning mr-2"
              // onClick={() => deleteSelectedBooking(booking.booking.booking_id)}
              // onClick={showConfirmHandler()}
              onClick={() => showConfirmHandler(booking.booking)}
            >
              Delete
            </button>
            <label className="label">
              {/* <span className="label-text-alt">{statusMessage}</span> */}
            </label>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
