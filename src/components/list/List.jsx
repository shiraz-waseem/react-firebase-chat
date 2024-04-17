import React from 'react'
import "./list.css"
import Userinfo from "./userInfo/Userinfo"
import ChatList from './chatList/chatList'


const List = () => {
    return (
        <div className='list'>
            <Userinfo />
            <ChatList />
        </div>
    )
}

export default List