import { useEffect, useState } from "react";
import {
  createRoom,
  getAllRooms,
  getRoomByID,
  update,
  deleteRoomById
} from "../api/rooms";
import { XMLUpload } from "../components/XMLUpload.jsx";
import DeleteHandler from "../components/DeleteHandler"
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function roomCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };

  const [room, setRoom] = useState([]);
  const [selectedRoomID, setSelectedRoomID] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({
    room_id: "",
    room_location: "",
    room_number: "",
  });
  useEffect(() => {
    getAllRooms().then((data) =>
      setRoom(data));
  }, [selectedRoomID]);

  useEffect(() => {

    if (selectedRoomID) {
      getRoomByID(selectedRoomID).then((data) => {
        setSelectedRoom(data);
      });
    } else {
      setSelectedRoom({
        room_id: "",
        room_location: "",
        room_number: "",
      });
    }
  }, [selectedRoomID]);

  function createOrUpdateSelectedRoom() {
    if (selectedRoomID) {
      update(selectedRoom).then((updateRoom) => {
        setSelectedRoomID(null);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
      });
    } else {
      createRoom(selectedRoom).then((createdRoom) => {
        // setSelectedRoomID(createdRoom);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
        getAllRooms().then((data) =>
          setRoom(data));
      });
    }
  }
  const deleteSelectedRoom = () => {

    if (selectedRoom) {
      deleteRoomById(selectedRoom).then((result) => {
        setSelectedRoomID(null);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
      });
      cancelConfirmHandler()
    }
  }

  return (
    <div className="flex flex-col min-h-screen  bg-gray-200 ">

      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedRoom}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
 <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">Room CRUD</h1>
      <div className="grow grid grid-cols-1 xl:grid-cols-2   justify-items-center w-8/12 mx-auto gap-4 pb-4">
        <div className="w-full rounded border-2 border-primary p-2">
          <table className="table table-compact text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {room.map((data) => (
                <tr key={data.room_id}>
                  <td>{data.room_id}</td>
                  <td>{data.room_location}</td>
                  <td>{data.room_number}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => setSelectedRoomID(data.room_id)}
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
          <div className="rounded border-2 border-primary p-2" >
            <div className="form-control">
              <label className="label">
                <span className="label-text">ID:</span>
              </label>
              <input
                type="text"
                readonly
                className="input input-bordered"
                value={selectedRoom.room_id}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room Location:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={selectedRoom.room_location}
                onChange={(e) => {
                  setSelectedRoom({ ...selectedRoom, room_location: e.target.value });
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room Number:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={selectedRoom.room_number}
                onChange={(e) =>
                  setSelectedRoom({ ...selectedRoom, room_number: e.target.value })
                }
              />
            </div>


            <div className="pt-2 flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedRoomID(null);
                  setSelectedRoom({
                    room_id: "",
                    room_location: "",
                    room_number: "",
                  });
                }}
              >
                New
              </button>
              <button
                className="btn"
                onClick={() => createOrUpdateSelectedRoom()}
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
          <div className="rounded border-2 border-primary p-2 my-4">

            <XMLUpload
              endpoint="/room/upload/xml"
              onUploadSuccess={() => {
                getAllRooms().then((data) =>
                  setRoom(data));
              }} />

          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
