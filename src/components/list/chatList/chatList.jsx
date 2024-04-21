import React, { useState, useEffect } from 'react'
import "./chatlist.css"
import AddUser from './addUser/addUser';
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const { currentUser } = useUserStore();
    const [chats, setChats] = useState([]);


    useEffect(() => {
        // const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc) => {
        //     // console.log("Current data: ", doc.data());
        //     setChats(doc.data())
        // });



        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            // We got a list
            const promises = items.map(async (item) => {
                // Fetching data through receiverId we got from userchats
                // Jis id sy receive huwa unki chats hi aye gy na
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                // returning all the chatinfo through item and the user too.
                return { ...item, user };
            })

            const chatData = await Promise.all(promises);
            // setChats(chatData);

            // To show latest chats we will sort
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        // cleanup
        return () => {
            unSub();
        };
    }, [currentUser.id])

    console.log("Chats are: ", chats)

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

            {/* Displaying chats.  */}
            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                    <img
                        src=
                        "./images/avatar.png"
                        alt=""
                    />
                    <div className="texts">
                        {/* Jiska msg uska name */}
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}

        </div>
    )
}

export default ChatList