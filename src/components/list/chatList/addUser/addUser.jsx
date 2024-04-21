import React, { useState } from 'react'
import "./addUser.css"
import { useUserStore } from '../../../../lib/userStore';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../../../../lib/firebase";


const AddUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();


    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // return the first docs and return it to data
                setUser(querySnapshot.docs[0].data());
            }

        } catch (err) {
            console.log(err);
        }

    }

    const handleAdd = async () => {
        // Creating new chat
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            // Lets add a new chat
            const newChatRef = doc(chatRef);  // we need id is lia variable bana ke kia. A reference is created

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            // console.log(newChatRef.id)  // ChatId

            // We will pass here the userId (Jo banda search kia)
            await updateDoc(doc(userChatsRef, user.id), {
                // Arrayunion simple push in array, in arrayUnion you cant use serverTimeStamp

                // Here the userchat ko it will pass our id at receiver
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })
            // For us
            // For our chats

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });


        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>

            {/* User */}
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "./images/avatar.png"} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    )
}

export default AddUser