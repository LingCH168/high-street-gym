import { useEffect, useState } from "react";
import DeleteHandler from "../components/DeleteHandler"
import {
  createBlog_post,
  getAllBlog_posts,
  getBlog_postByID,
  update,
  deleteBlog_postById,
} from "../api/blog_post";
import { getAllStaff } from "../api/staff";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';


export default function postCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {

    setShowConfirm(false);
  };
  const [post, setPost] = useState([]);
  const [selectedPostID, setSelectedPostID] = useState(null);
  const [selectedPost, setSelectedPost] = useState({
    post_id: "",
    post_date: "",
    post_time: "",
    post_user_id: "",
    post_title: "",
    post_content: ""
  });
  useEffect(() => {
    getAllBlog_posts().then(
      (data) => setPost(data)
      // setPost(prevposts => [...prevposts, ...data.map(post => ({
      //   ...post,
      //   post_created_date: new Date(post.post_created_date).toLocaleDateString()
      // }))]
      // )
    );
  }, [selectedPostID]);
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    getAllStaff().then((data) => {
      const filteredData = data.filter((staff) => staff.staff_access_role === 'user');
      setStaff(filteredData);
    })
  }, []);
  useEffect(() => {
  
    if (selectedPostID) {
      getBlog_postByID(selectedPostID).then((data) => {
        setSelectedPost(data);
      });
    } else {
      setSelectedPost({
        post_id: "",
        post_date: "",
        post_time: "",
        post_user_id: "",
        post_title: "",
        post_content: ""
      });
    }
  }, [selectedPostID]);

  function createOrUpdateSelectedPost() {
    if (selectedPostID) {
      // console.log(selectedPost)
      update(
        {
          ...selectedPost, post_user_id: selectedPost.post_user_id.toString()
        }).then((updatePost) => {
          setSelectedPostID(null);
          setSelectedPost({
            post_id: "",
            post_date: "",
            post_time: "",
            post_user_id: "",
            post_title: "",
            post_content: ""
          });
        });
    } else {
      // console.log(selectedPost)
      createBlog_post(
        selectedPost)
        // {
        //   ...selectedPost, post_user_id: Number(selectedPost.post_user_id)
        // }
        .then((createdPost) => {
          // setSelectedPostID(createdPost);
          setSelectedPost({
            post_id: "",
            post_date: "",
            post_time: "",
            post_user_id: "",
            post_title: "",
            post_content: ""
          });
          getAllBlog_posts().then(
            (data) => setPost(data)
          );
        });
    }
  }
  const deleteSelectedPost = () => {
    if (selectedPost) {
      deleteBlog_postById(selectedPost).then((result) => {
        setSelectedPostID(null);
        setSelectedPost({
          post_id: "",
          post_date: "",
          post_time: "",
          post_user_id: "",
          post_title: "",
          post_content: ""
        });
      });
      cancelConfirmHandler()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedPost}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
 <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">Post CRUD</h1>

      <div className="grow grid grid-cols-1 xl:grid-cols-2  justify-items-center w-8/12 mx-auto gap-4 mb-4 pb-4">
        <div className="overflow-auto w-full rounded border-2 border-primary p-2">
          <table className="table table-compact text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>User_id</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {post.map((data) => (
                <tr key={data.post_id}>
                  <td>{data.post_id}</td>
                  <td>{data.post_date}</td>
                  <td>{data.post_time}</td>
                  <td>{data.post_user_id}</td>
                  <td>{data.post_title}</td>
                  <td>{data.post_content}</td>

                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => setSelectedPostID(data.post_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full rounded border-2 border-primary p-2 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID:</span>
            </label>
            <input
              type="text"
              readonly
              className="input input-bordered"
              value={selectedPost.post_id}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">post_date:</span>
            </label>
            <input
              type="text"
              readonly
              disabled
              className="input input-bordered"
              value={selectedPost.post_date}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_date: e.target.value,
                })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">post_time:</span>
            </label>
            <input
              type="text"
              readonly
              disabled
              className="input input-bordered"
              value={selectedPost.post_time}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_time: e.target.value,
                })
              }
            />
          </div>

          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">post_user_id:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedPost.post_user_id}
              onChange={(e) => {
                setSelectedPost({
                  ...selectedPost,
                  post_user_id: e.target.value,
                });
              }}
            />
          </div> */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">post_user_id:</span>
            </label>
            <select
              className="input input-bordered"
              value={selectedPost.post_user_id}
              onChange={(e) => {
                setSelectedPost({
                  ...selectedPost,
                  post_user_id: e.target.value,
                });
              }}
            >
              {/* <option disabled selected>Pick one</option> */}
              <option value="" >-- Select a user ID --</option>
              {staff.map(option => (
                <option key={option.staff_id} value={option.staff_id}>{option.staff_id}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">post_title:</span>
            </label>
            {/* <select
              className="input input-bordered"
              value={selectedPost.post_title}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_title: e.target.value,
                })
              }
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
            </select> */}

            <input
              type="text"
              className="input input-bordered"
              value={selectedPost.post_title}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_title: e.target.value,
                })
              }
            />
          </div>



          <div className="form-control">
            <label className="label">
              <span className="label-text">post_content:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={selectedPost.post_content}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_content: e.target.value,
                })
              }
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedPostID(null);
                setSelectedPost({
                  post_id: "",
                  post_date: "",
                  post_time: "",
                  post_user_id: "",
                  post_title: "",
                  post_content: ""
                });
              }}
            >
              New
            </button>
            <button
              className="btn"
              onClick={() => createOrUpdateSelectedPost()}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={showConfirmHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
