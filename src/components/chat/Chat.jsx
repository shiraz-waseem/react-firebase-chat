import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { useChatStore } from '../../lib/chatStore';
import { format } from "timeago.js";
import upload from '../../lib/upload';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const endRef = useRef(null);

    const [chat, setChat] = useState();
    const { currentUser } = useUserStore();
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();

    const [img, setImg] = useState({
        file: null,
        url: "",
    });

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);


    const handleEmoji = (e) => {
        // console.log(e)
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSend = async () => {
        if (text === "") return;
        let imgUrl = null;

        try {
            if (img.url) {
                console.log("I am here")
                imgUrl = await upload(img.file);
            }
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    // Condition likhne ke lia ...(). If its null we will not have anything and this expression will be empty
                    ...(imgUrl && { img: imgUrl }),
                })
            })

            // Working on seen and getting all chats messages
            // const userChatsRef = doc(db, "userchats", currentUser.id);
            // const userChatsSnapshot = await getDoc(userChatsRef);

            // if (userChatsSnapshot.exists()) {
            //     const userChatsData = userChatsSnapshot.data(); // we have our chats
            //     const chatIndex = userChatsRef.chats.findIndex(   // Finding the exactly same chat so we can update last message and seen
            //         (c) => c.chatId == chatId
            //     )

            //     userChatsData.chats[chatIndex].lastMessage = text;
            //     userChatsData.chats[chatIndex].isSeen = true // because we are sending the message
            //     userChatsData.chats[chatIndex].updatedAt = Date.now();

            //     // updating our usersChat
            //     await updateDoc(userChatsRef, {
            //         chats: userChatsData.chats,
            //     });
            // }


            // We have to update other user chats when they send message
            // .Their chats and their seen will be false but we can know ke last message aya wa

            const userIDs = [currentUser.id, user.id];    // user is useChatStorage

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data(); // we have our chats
                    const chatIndex = userChatsData.chats.findIndex(   // Finding the exactly same chat so we can update last message and seen
                        (c) => c.chatId == chatId
                    );


                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen =
                        id === currentUser.id ? true : false;
                    // If not true its mean koi other user hai
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    // updating our usersChat
                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    });
                }
            })

        } catch (e) {
            console.log(e)
        }
        finally {
            setImg({
                file: null,
                url: "",
            });

            setText("");
        }
    }

    console.log(chat)

    return (
        <div className='chat'>

            {/* Top */}
            <div className="top">
                <div className="user">
                    <img src="./images/avatar.png" alt="" />
                    <div className="texts">
                        <span>John Doe</span>
                        <p>Lorem ipsum dolor, sit amet.</p>
                    </div>
                </div>

                <div className="icons">
                    <img src="./images/phone.png" alt="" />
                    <img src="./images/video.png" alt="" />
                    <img src="./images/info.png" alt="" />
                </div>
            </div>

            {/* Center */}
            <div className="center">
                {chat?.messages?.map((message) => (

                    <div
                        // apni chat khole gy tw dosra banda tw currentUser nahi huga same for dosra banda khole ga
                        className={
                            message.senderId === currentUser?.id ? "message own" : "message"
                        }
                        key={message?.createAt}
                    >
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            <span>{format(message.createdAt.toDate())}</span>
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>

            {/* Bottom */}
            <div className="bottom">

                {/* Left icons */}
                <div className="icons">
                    {/* Sending Image */}
                    <label htmlFor="file">
                        <img src="./images/img.png" alt="" />
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleImg}
                    />
                    <img src="./images/camera.png" alt="" />
                    <img src="./images/mic.png" alt="" />
                </div>

                {/* Search Field */}
                <input
                    type="text"
                    placeholder={
                        isCurrentUserBlocked || isReceiverBlocked
                            ? "You cannot send a message"
                            : "Type a message..."
                    }
                    // placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />

                {/* Right field of emoji and send button */}
                <div className="emoji">
                    <img
                        src="./images/emoji.png"
                        alt=""
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button
                    className="sendButton"
                    onClick={handleSend}
                // disabled={isCurrentUserBlocked || isReceiverBlocked}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat