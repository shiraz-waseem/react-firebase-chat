import React from 'react'
import "./detail.css"

const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="./images/avatar.png" alt="" />
                <h2>John Doe</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {/* Extra */}
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./images/arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./images/arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./images/arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./images/arrowDown.png" alt="" />
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                                    alt=""
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./images/download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                                    alt=""
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./images/download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                                    alt=""
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./images/download.png" alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                                    alt=""
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./images/download.png" alt="" className="icon" />
                        </div>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./images/arrowUp.png" alt="" />
                    </div>
                </div>

                {/* Buttons */}
                <button>
                    "Block User"
                </button>
                <button className="logout">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Detail