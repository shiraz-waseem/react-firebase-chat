import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });
    const [loading, setLoading] = useState(false);


    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        toast.success("Login")
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        // Form sy getting values
        // setLoading(true);
        const formData = new FormData(e.target);

        // Form data sy getting them
        const { username, email, password } = Object.fromEntries(formData);

        console.log(username)
        // VALIDATE INPUTS
        // if (!username || !email || !password)
        //     return toast.warn("Please enter inputs!");
        // if (!avatar.file) return toast.warn("Please upload an avatar!");

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
        }


    }

    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome back,</h2>
                <form
                    onSubmit={handleLogin}
                >
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            {/* Register */}
            <div className="item">
                <h2>Create an Account</h2>
                <form
                    onSubmit={handleRegister}
                >
                    <label htmlFor="file">
                        {/* <img src="./images/avatar.png" alt="" /> */}
                        <img src={avatar.url || "./images/avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleAvatar}
                    />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login