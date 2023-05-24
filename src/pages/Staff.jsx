import { useEffect, useState } from "react";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DeleteHandler from "../components/DeleteHandler"
import {
  getAllStaff,
  getStaffByID,
  update,
  registerStaff,
  deleteStaffById
} from "../api/staff.js";

export default function StaffCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {

    setShowConfirm(false);
  };
  const [staff, setStaff] = useState([]);
  const [selectedStaffID, setSelectedStaffID] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState({
    staff_id: "",
    staff_email: "",
    staff_password: "",
    staff_access_role: "",
    staff_phone: "",
    staff_first_name: "",
    staff_last_name: "",
    staff_address: "",
    staff_authentication_key: ""
  });
  useEffect(() => {
    getAllStaff().then((staff) =>
      setStaff(staff));
  }, [selectedStaffID]);

  useEffect(() => {
  
    if (selectedStaffID) {
      getStaffByID(selectedStaffID).then((user) => {
        setSelectedStaff(user);
      });
    } else {
      setSelectedStaff({
        staff_id: "",
        staff_email: "",
        staff_password: "",
        staff_access_role: "",
        staff_phone: "",
        staff_first_name: "",
        staff_last_name: "",
        staff_address: "",
        staff_authentication_key: ""
      });
    }
  }, [selectedStaffID]);

  function createOrUpdateSelectedStaff() {
    if (selectedStaffID) {
      update(selectedStaff).then((updateStaff) => {
        // console.log(selectedStaff)
        setSelectedStaffID(null);
        setSelectedStaff({
          staff_id: "",
          staff_email: "",
          staff_password: "",
          staff_access_role: "",
          staff_phone: "",
          staff_first_name: "",
          staff_last_name: "",
          staff_address: "",
          staff_authentication_key: ""
        });
      });
    } else {
      registerStaff(selectedStaff).then((createdStaff) => {
        setSelectedStaff({
          staff_id: "",
          staff_email: "",
          staff_password: "",
          staff_access_role: "",
          staff_phone: "",
          staff_first_name: "",
          staff_last_name: "",
          staff_address: "",
          staff_authentication_key: ""
        });

        getAllStaff().then((staff) =>
          setStaff(staff));
      }, []);
    }
  }
  const  deleteSelectedStaff = () => {
    deleteStaffById(selectedStaff).then((result) => {
      setSelectedStaffID(null);
      setSelectedStaff({
        staff_id: "",
        staff_email: "",
        staff_password: "",
        staff_access_role: "",
        staff_phone: "",
        staff_first_name: "",
        staff_last_name: "",
        staff_address: "",
        staff_authentication_key: ""
      });
    });
    cancelConfirmHandler()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 ">
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedStaff}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav />

      <h1 className="text-5xl font-bold my-6 text-center">User List</h1>
      <h2 className="text-3xl font-bold my-6 text-center">Our success is a reflection of our team's hard work and dedication.</h2>

      <div className=" grow grid grid-cols-1 xl:grid-cols-2 my-10 mx-auto justify-items-center gap-10  ">
        <div className="overflow-auto w-4/5 rounded border-2 border-primary p-2 my-4 " >
          <table className="table table-compact w-4/5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staff) => (
                <tr key={staff.staff_id}>
                  <td>{staff.staff_id}</td>
                  <td>{staff.staff_email}</td>
                  <td>{staff.staff_access_role}</td>
                  <td>{staff.staff_phone}</td>
                  <td>{staff.staff_first_name}</td>
                  <td>{staff.staff_last_name}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => setSelectedStaffID(staff.staff_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-4/5 rounded border-2 border-primary p-2 my-4">

          <div className="form-control">
            <label className="label">
              <span className="label-text">ID:</span>
            </label>
            <input
              type="text"
              readonly
              className="input input-bordered"
              value={selectedStaff.staff_id}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedStaff.staff_email}
              onChange={(e) => {
                setSelectedStaff({ ...selectedStaff, staff_email: e.target.value });
              }}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={selectedStaff.staff_password}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_password: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role:</span>
            </label>
            <select
              className="select select-bordered"
              value={selectedStaff.staff_access_role}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_access_role: e.target.value })
              }
            >
              {/* <option disabled selected>Pick one</option> */}
              <option value="" >-- Select an role --</option>
              <option value="admin">admin</option>
              <option value="trainer">trainer</option>
              <option value="user">user</option>
            </select>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedStaff.staff_phone}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_phone: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedStaff.staff_first_name}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_first_name: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedStaff.staff_last_name}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_last_name: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedStaff.staff_address}
              onChange={(e) =>
                setSelectedStaff({ ...selectedStaff, staff_address: e.target.value })
              }
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedStaffID(null);
                setSelectedStaff({
                  staff_id: "",
                  staff_email: "",
                  staff_password: "",
                  staff_access_role: "",
                  staff_phone: "",
                  staff_first_name: "",
                  staff_last_name: "",
                  staff_address: "",
                  staff_authentication_key: ""
                });
              }}
            >
              New
            </button>
            <button
              className="btn"
              onClick={() => createOrUpdateSelectedStaff()}
            >
              Save
            </button>{" "}
            <button
              className="btn btn-secondary"
              // onClick={() => deleteSelectedStaff()}
              onClick={showConfirmHandler}
            >
              Delete
            </button>
          </div>
        </div>


      </div>


      <Footer />
    </div>
  );
}
