import React from 'react'
import "./userInfo.css"
import { useUserStore } from '../../../lib/userStore'

const Userinfo = () => {
    const { currentUser } = useUserStore();
    return (
        <div className='userInfo'>
            <div className="user">
                {/* <img src="./images/avatar.png" alt="" />
                <h3>John Doe</h3> */}

                <img src={currentUser.avatar || "./images/avatar.png"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>

            {/* Showing icons */}
            <div className="icons">
                <img src="./images/more.png" alt="" />
                <img src="./images/video.png" alt="" />
                <img src="./images/edit.png" alt="" />
            </div>

        </div>
    )
}

export default Userinfo