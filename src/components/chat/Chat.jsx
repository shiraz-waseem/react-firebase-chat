import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const handleEmoji = (e) => {
        // console.log(e)
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

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
                <div className="message">
                    <img src="./images/avatar.png" alt="" />
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>


                <div className="message">
                    <img src="./images/avatar.png" alt="" />
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>


                <div className="message own">
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>


                <div className="message">
                    <img src="./images/avatar.png" alt="" />
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>

                <div className="message own">
                    <div className="texts">
                        <p>A random text</p>
                        <span>1 mint ago</span>
                    </div>
                </div>

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