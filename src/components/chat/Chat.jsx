import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { useChatStore } from '../../lib/chatStore';
import { format } from "timeago.js";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const endRef = useRef(null);

    const [chat, setChat] = useState();
    const { currentUser } = useUserStore();
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
        useChatStore();

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

                    <div className="message own" key={message?.createAt}
                    >
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            <span>{format(message.createdAt.toDate())}</span>

                        </div>
                    </div>

                ))}
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
                    // onChange={handleImg}
                    />
                    <img src="./images/camera.png" alt="" />
                    <img src="./images/mic.png" alt="" />
                </div>

                {/* Search Field */}
                <input
                    type="text"
                    // placeholder={
                    //     isCurrentUserBlocked || isReceiverBlocked
                    //         ? "You cannot send a message"
                    //         : "Type a message..."
                    // }
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                // disabled={isCurrentUserBlocked || isReceiverBlocked}
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
                // onClick={handleSend}
                // disabled={isCurrentUserBlocked || isReceiverBlocked}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat