import { useEffect, useState } from "react";
import { XMLUpload } from "../components/XMLUpload.jsx";
import DeleteHandler from "../components/DeleteHandler.jsx"
import {
    createActivity,
    getAllActivities,
    getActivityByID,
    update,
    deleteActivityById
} from "../api/activities.js";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function activityCRUD() {
    const [showConfirm, setShowConfirm] = useState(false);
    const showConfirmHandler = () => {
        setShowConfirm(true);
    };
    const cancelConfirmHandler = () => {
        setShowConfirm(false);
    };
    const [activity, setActivity] = useState([]);
    const [selectedActivityID, setSelectedActivityID] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState({
        activity_id: "",
        activity_name: "",
        activity_description: "",
        activity_duration: "",
    });

    useEffect(() => {
        getAllActivities().then((data) =>
            setActivity(data)
        );
    }, [selectedActivityID]);
    
    useEffect(() => {
        if (selectedActivityID) {
            // console.log(selectedActivityID)
            getActivityByID(selectedActivityID).then((data) => {
                setSelectedActivity(data);
            });
        } else {
            setSelectedActivity({
                activity_id: "",
                activity_name: "",
                activity_description: "",
                activity_duration: "",
            });
        }
    }, [selectedActivityID]);

    function createOrUpdateSelectedActivity() {
        if (selectedActivityID) {
            update(selectedActivity).then((updateActivity) => {
                setSelectedActivityID(null);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
            });
        } else {
            createActivity(selectedActivity).then((createdActivity) => {
                //   setSelectedActivityID(createdActivity.id);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
                getAllActivities().then((data) =>
                    setActivity(data)
                );

            });
        }
    }
    const deleteSelectedActivity = () => {
        if (selectedActivity) {
            deleteActivityById(selectedActivity).then((result) => {
                setSelectedActivityID(null);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
            });
            cancelConfirmHandler()
        }

    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            {showConfirm && <DeleteHandler
                onDelete={deleteSelectedActivity}
                onCancel={cancelConfirmHandler}
            ></DeleteHandler>}
            <Nav></Nav>
            <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">Activity CRUD</h1>
            <div className="grow grid grid-cols-1 xl:grid-cols-2 justify-items-center w-8/12 mx-auto gap-4 pb-4">
                <div className="w-full overflow-auto  rounded border-2 border-primary p-2 ">
                    <table className="table table-compact">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activity.map((data) => (
                                <tr key={data.activity_id}>
                                    <td>{data.activity_id}</td>
                                    <td>{data.activity_name}</td>
                                    <td>{data.activity_description}</td>
                                    <td>{data.activity_duration}</td>
                                    <td>
                                        <button
                                            className="btn btn-xs"
                                            onClick={() => setSelectedActivityID(data.activity_id)}
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
                                value={selectedActivity.activity_id}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">activity name:</span>
                            </label>
                            {/* <select
                                className="input input-bordered"
                                value={selectedActivity.activity_name}
                                onChange={(e) => {
                                    setSelectedActivity({ ...selectedActivity, activity_name: e.target.value });
                                }}
                            >
                                <option disabled selected>Pick one</option>
                                <option value="" >-- Select an activity --</option>
                                <option value="Yoga">Yoga</option>
                                <option value="Pilates">Pilates</option>
                                <option value="Abs">Abs</option>
                                <option value="HIIT or high-intensity interval training">HIIT or high-intensity interval training</option>
                                <option value="Indoor cycling">Indoor cycling</option>
                                <option value="Boxing">Boxing</option>
                                <option value="Zumba">Zumba</option>
                            </select>  */}

                            <input
                                type="text"
                                className="input input-bordered"
                                value={selectedActivity.activity_name}
                                onChange={(e) =>
                                    setSelectedActivity({ ...selectedActivity, activity_name: e.target.value })
                                }
                            />

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">activity_description:</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={selectedActivity.activity_description}
                                onChange={(e) =>
                                    setSelectedActivity({ ...selectedActivity, activity_description: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">activity_duration:</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={selectedActivity.activity_duration}
                                onChange={(e) =>
                                    setSelectedActivity({ ...selectedActivity, activity_duration: e.target.value })
                                }
                            />
                        </div>

                        <div className="pt-2 flex gap-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setSelectedActivityID(null);
                                    setSelectedActivity({
                                        activity_id: "",
                                        activity_name: "",
                                        activity_description: "",
                                        activity_duration: "",
                                    });
                                }}
                            >
                                New
                            </button>
                            <button
                                className="btn"
                                onClick={() => createOrUpdateSelectedActivity()}
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
                        <XMLUpload endpoint="/activity/upload/xml" onUploadSuccess={() => {
                            getAllActivities().then((data) =>
                                setActivity(data));
                        }} />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
