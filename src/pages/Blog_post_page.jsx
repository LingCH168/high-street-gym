import React, { useEffect, useState } from 'react'
import Nav from "../components/Nav";
import Footer from '../components/Footer.jsx';
import { useAuthentication } from "../hooks/authentication"
import { useNavigate } from "react-router-dom"
import {
	getAllBlog_posts,
	deleteBlog_postById,
} from "../api/blog_post";
import DeleteHandler from "../components/DeleteHandler"
import ToolBar from '../components/ToolBar'


export default function Blog_post() {
	const [showConfirm, setShowConfirm] = useState(false);
	const showConfirmHandler = (post) => {
		setShowConfirm(true);
		setObjPost(post)
	};
	const cancelConfirmHandler = () => {
		setShowConfirm(false);
	};

	const navigate = useNavigate()
	const [posts, setPosts] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [user] = useAuthentication()
	//  console.log(user)
	useEffect(() => {
		getAllBlog_posts().then(
			(data) => setPosts(data)
		);
	}, [refresh]);
	const [objPost, setObjPost] = useState({});
	const deleteSelectedPost = () => {
		// console.log("before", objPost)
		if (objPost) {
			// console.log("after", objPost)
			deleteBlog_postById(objPost).then((result) => {
				setRefresh(!refresh)
			});
			cancelConfirmHandler()
		}
	}

	return (
		<div className='flex flex-col min-h-screen'>
			{showConfirm && <DeleteHandler
				onDelete={deleteSelectedPost}
				onCancel={cancelConfirmHandler}
			></DeleteHandler>}

			<Nav></Nav>
			<ToolBar></ToolBar>
			<h1 className="text-5xl font-bold my-6 text-center">Blog Post</h1>
			<div className='mx-auto mb-6 '>

				<div className='mx-6'>
					{user ? (
						<>
							<button
								className="btn btn-accent mr-2"
								onClick={() => navigate("./user_edit_post", { state: { user } })}
							>
								Post Something ?
							</button>
						</>
					) : (
						<>	<div className='mx-auto my-10 '>
							<span className='mx-6 text-3xl'>
								Post something? Please sign in
							</span>
							<div className='m-4 text-center'>
								<button
									className="btn btn-accent mr-2"
									onClick={() => navigate("/login")}
								>
									Sign In
								</button>
								<button
									className="btn btn-warning"

									onClick={() => navigate("/register")}
								>
									Sign up
								</button>
							</div>
						</div>
						</>
					)}
				</div>
			</div>
			<div className="grow w-8/12 mx-auto ">
				{posts.map(post => (
					<div>
						<div className="hero-content items-center xl:items-stretch flex  flex-col xl:flex-row ">
							<img
								// src={`../../public/${post.post_title}.jpg`}
								src={'../../public/LogIn.jpg'} 
								alt={`${post.post_title}`}
								className=" w-full xl:w-1/2 max-h-[400px] md:max-h-[600px] rounded-lg shadow-2xl bg-yellow-300 " />
							{/* <div
								// style={{ backgroundImage:`url(../../public/${post.post_title}.jpg)`}}
								className="grow rounded-lg shadow-2xl bg-yellow-300   bg-cover bg-repeat "
							>
							</div> */}
							<div className="w-full xl:w-1/2 min-h-[400px] md:min-h-[600px]      lg: flex flex-col justify-between  mx-2  rounded border-2 border-primary p-2">
								<div>
									<h1 className="text-3xl font-bold my-4 uppercase"> {post.post_title}</h1>

									{user ? (
										<>
											<h2 className="text-xl font-bold">First Name:{user.staff_first_name}</h2>
										</>
									) : (
										<>
										</>
									)}
									<h2 className="text-xl font-bold">Date:{post.post_date}</h2>
									<h2 className="text-xl font-bold">Time:{post.post_time}</h2>
								</div >
								<div className="grow form-control">
									<label className="label">
										<span className="label-text font-bold text-xl">Post_content:</span>
									</label>
									<textarea

										// readOnly
										disabled
										className="input input-bordered "
										value={post.post_content}
									>
									</textarea>
								</div>
								<div>
									{user && (user.staff_id == post.post_user_id || user.staff_access_role !== "user") && (
										<>
											<button
												className="btn btn-accent mr-2"
												onClick={() => navigate("./user_edit_post/" + post.post_id)}
											>
												Edit
											</button>
											<button
												className="btn btn-warning"
												onClick={() => {
													showConfirmHandler(post);
													// console.log(post)
													// deleteSelectedPost(post);
												}}
											// onClick={() => deleteSelectedPost(post)}
											>
												Delete
											</button>
										</>
									)}
									{user && (user.staff_access_role == "user") && (user.staff_id !== post.post_user_id) && (
										<>
											<button
												className="btn btn-accent mr-2"
												disabled
												onClick={() => navigate("./user_edit_post/" + post.post_id)}
											>
												New / Edit
											</button>
											<button
												className="btn btn-warning"
												disabled
												onClick={() => deleteSelectedPost(post)}
											>
												Delete
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<Footer></Footer>
		</div>

	)
}
