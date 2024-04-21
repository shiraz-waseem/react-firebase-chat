import React from 'react'
import "./addUser.css"
const AddUser = () => {
    return (
        <div className='addUser'>
            <form>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>

            {/* User */}
            <div className="user">
                <div className="detail">
                    <img src="./images/avatar.png" alt="" />
                    <span>John Doe</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    )
}

export default AddUser