import { useEffect, useState } from "react";
import DeleteHandler from "../components/DeleteHandler"
import {
  createClass,
  getAllClasses,
  getClassByID,
  update,
  deleteClassById,
} from "../api/classes";
import { getAllStaff } from "../api/staff";
import { getAllActivities } from "../api/activities";
import { getAllRooms } from "../api/rooms";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function classCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const [classData, setClassData] = useState([]);
  const [selectedClassID, setSelectedClassID] = useState(null);
  const [selectedClass, setSelectedClass] = useState({
    class_id: "",
    class_date: "",
    class_time: "",
    class_room_id: "",
    class_activity_id: "",
    class_trainer_user_id: "",
  });
  useEffect(() => {
    getAllClasses().then((data) =>
      // console.log(class),
      setClassData(data)
    );
  }, [selectedClassID]);


  const [staff, setStaff] = useState([]);
  // console.log(staff)
  useEffect(() => {
    getAllStaff().then((data) => {
      const filteredData = data.filter((staff) => staff.staff_access_role === 'trainer');
      setStaff(filteredData);
    })
  }, []);

  const [activity, setActivity] = useState([]);
  useEffect(() => {
    getAllActivities().then((data) =>
      setActivity(data)
    );
  }, []);

  const [room, setRoom] = useState([]);
  useEffect(() => {
    getAllRooms().then((data) =>
      setRoom(data));
  }, []);


  useEffect(() => {

    if (selectedClassID) {
      // console.log(selectedClassID)
      getClassByID(selectedClassID).then((data) => {
        // console.log(data)
        setSelectedClass(data);
      });
    } else {
      setSelectedClass({
        class_id: "",
        class_date: "",
        class_time: "",
        class_room_id: "",
        class_activity_id: "",
        class_trainer_user_id: "",
      });
    }
  }, [selectedClassID]);

  function createOrUpdateSelectedClass() {
    if (selectedClassID) {
      // console.log(selectedClass)
      update(
        {
          ...selectedClass, class_room_id: selectedClass.class_room_id.toString(), class_activity_id: selectedClass.class_activity_id.toString(), class_trainer_user_id: selectedClass.class_trainer_user_id.toString()
        }
      ).then((updateClass) => {
        setSelectedClassID(null);
        setSelectedClass({
          class_id: "",
          class_date: "",
          class_time: "",
          class_room_id: "",
          class_activity_id: "",
          class_trainer_user_id: "",
        });
      });
    } else {
      // console.log(selectedClass)
      createClass(selectedClass).then((createdClass) => {
        // setSelectedClassID(createdClass.class_id);
        getAllClasses().then((data) =>
          setClassData(data)
        );
        setSelectedClass({
          class_id: "",
          class_date: "",
          class_time: "",
          class_room_id: "",
          class_activity_id: "",
          class_trainer_user_id: "",
        });
      });
    }
  }
  const deleteSelectedClass = () => {
    deleteClassById(selectedClass).then((result) => {
      setSelectedClassID(null);
      setSelectedClass({
        class_id: "",
        class_date: "",
        class_time: "",
        class_room_id: "",
        class_activity_id: "",
        class_trainer_user_id: "",
      });
    });
    cancelConfirmHandler()

  }

  // useEffect(() => {
  //   const currentDate = new Date().toISOString().slice(0,10);
  //   setSelectedClass({
  //     ...selectedClass,
  //     class_date: currentDate,
  //   });
  // }, []);


  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedClass}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
 <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">Class CRUD</h1>

      <div className="grow grid grid-cols-1 xl:grid-cols-2  justify-items-center w-8/12 mx-auto gap-4 pb-4">
        <div className="w-full overflow-auto rounded border-2 border-primary p-2">
          <table className="table table-compact w-4/5 text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date </th>
                <th>Time</th>
                <th>Room_ID</th>
                <th>Activity_id</th>
                <th>Trainer_ID</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((data) => (
                <tr key={data.class_id}>
                  <td>{data.class_id}</td>
                  <td>{data.class_date}</td>
                  <td>{data.class_time}</td>
                  <td>{data.class_room_id}</td>
                  <td>{data.class_activity_id}</td>
                  <td>{data.class_trainer_user_id}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => setSelectedClassID(data.class_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full">
          <div className="rounded border-2 border-primary p-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">ID:</span>
              </label>
              <input
                type="text"
                readonly
                className="input input-bordered"
                value={selectedClass.class_id}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="2023/04/20"
                // value={selectedClass.class_date || new Date().toISOString().slice(0, 10)}
                // value={new Date(selectedClass.class_date).toISOString().slice(0, 10)|| new Date().toISOString().slice(0, 10)}
                value={selectedClass.class_date || new Date().toISOString().slice(0, 10)}

                onChange={(e) => {
                  setSelectedClass({
                    ...selectedClass,
                    class_date: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Time:</span>
              </label>
              <input
                type="text"
                placeholder="12:30"
                className="input input-bordered"
                value={selectedClass.class_time || "12:30:00"}
                onChange={(e) => {
                  setSelectedClass({
                    ...selectedClass,
                    class_time: e.target.value,
                  });
                }}
              />
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Room ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={selectedClass.class_room_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_room_id: e.target.value,
                  })
                }
              />
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room ID:</span>
              </label>
              <select
                className="input input-bordered"
                value={selectedClass.class_room_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_room_id: e.target.value,
                  })
                }
              >
                {/* <option disabled selected>Pick one</option> */}
                <option value="" >-- Select a room ID --</option>
                {room.map(option => (
                  <option key={option.room_id} value={option.room_id}>{option.room_id}</option>
                ))}
              </select>
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Activity ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={selectedClass.class_activity_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_activity_id: e.target.value,
                  })
                }
              />
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Activity ID:</span>
              </label>
              <select
                className="input input-bordered"
                value={selectedClass.class_activity_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_activity_id: e.target.value,
                  })
                }
              >
                {/* <option disabled selected>Pick one</option> */}
                <option value="" >-- Select an activity ID --</option>
                {activity.map(option => (
                  <option key={option.activity_id} value={option.activity_id}>{option.activity_id}</option>
                ))}
              </select>
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Trainer Staff ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={selectedClass.class_trainer_user_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_trainer_user_id: e.target.value,
                  })
                }
              />
            </div> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Trainer Staff ID:</span>
              </label>
              <select
                className="input input-bordered"
                value={selectedClass.class_trainer_user_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_trainer_user_id: e.target.value,
                  })
                }
              >
                {/* <option disabled selected>Pick one</option> */}
                <option value="" >-- Select a trainer staff ID --</option>
                {staff.map(option => (
                  <option key={option.staff_id} value={option.staff_id}>{option.staff_id}</option>
                ))}
              </select>
            </div>
            <div className="pt-2 flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedClassID(null);
                  setSelectedClass({
                    class_id: "",
                    class_date: "",
                    class_time: "",
                    class_room_id: "",
                    class_activity_id: "",
                    class_trainer_user_id: "",
                  });
                }}
              >
                New
              </button>
              <button
                className="btn"
                onClick={() => createOrUpdateSelectedClass()}
              >
                Save
              </button>{" "}
              <button
                className="btn btn-secondary"
                onClick={showConfirmHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
