import React, { useState } from 'react'
import "./chatlist.css"
import AddUser from './addUser/addUser';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);

    return (

        <div className='chatList'>

            {/* Search & Add User */}
            <div className="search">

                {/* Search */}
                <div className="searchBar">
                    <img src="./images/search.png" alt="" />
                    <input
                        type="text"
                        placeholder="Search"
                    // onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {/* Add User*/}
                <img
                    src={addMode ? "./images/minus.png" : "./images/plus.png"}
                    // src='./images/plus.png'
                    alt=""
                    className='add'
                    // Changing state
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>

            {/* Displaying chats. One Item is one chat */}
            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>


            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            <div className="item">
                <img
                    src=
                    "./images/avatar.png"
                    alt=""
                />
                <div className="texts">
                    {/* Jiska msg uska name */}
                    <span>John Doe</span>
                    {/* Last message hi dhikata ha na */}
                    <p>Hello for now</p>
                </div>
            </div>

            {addMode && <AddUser />}

        </div>
    )
}

export default ChatList