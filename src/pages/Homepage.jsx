import React,{useState }  from 'react';
import { useNavigate } from "react-router-dom"
import homepage_picture from '../../public/Homepage.jpg'
import { useAuthentication } from "../hooks/authentication"

function Homepage() {
    const [user, login, logout] = useAuthentication()
    // const {login} = useAuthentication()
    const [statusMessage, setStatusMessage] = useState("")
    // console.log(login)
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate('/class_booking');
    };

    return (
        <div className='flex '>
            <div className="hero min-h-screen " style={{ backgroundImage: `url(${homepage_picture})`}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5 text-lg">Looking to get in shape and live a healthier lifestyle? Look no further than our gym! Our state-of-the-art facility offers everything you need to achieve your fitness goals, from top-of-the-line equipment and expert personal trainers to a variety of group fitness classes. Whether you're a seasoned athlete or just starting out, we have something for everyone. Join our welcoming community and experience the transformative power of fitness. Don't wait any longer to start your fitness journey - sign up for a membership today and start reaching your full potential!</p>
                        <button className="btn btn-primary rounded-full text-xl" 
                        onClick={handleButtonClick}
                         >Get Started</button>
                    </div>
                </div>
            </div>

     {/* This section is included for debugging and development purposes */}
                <div>
                <h2>Default users</h2>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>email</th>
                            <th>password</th>
                            <th>login</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>lingCH111@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("lingCH111@server.com", "123")
                                            .then(result => {
                                                // console.log(666)
                                                setStatusMessage("Login successful!")
                                                navigate("/staff")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                                        
                            </td>
                            <td> <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label></td>
                        </tr>
                        <tr>
                            <td>trainer</td>
                            <td>lingCH222@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("lingCH222@server.com", "123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/booking")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                            <td> <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label></td>
                        </tr>
                        <tr>
                            <td>user</td>
                            <td>lingCH333@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("lingCH333@server.com", "123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                               
                                                navigate("/user_booking")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                            <td> <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label></td>
                        </tr>
                    </tbody>
                </table>
                </div>
        </div>
    );
}

export default Homepage;

