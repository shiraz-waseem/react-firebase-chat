import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import upload from '../../lib/upload';
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("You are successfully logged in")
        }
        catch (err) {
            setLoading(false)
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }


    // Sign up
    const handleRegister = async (e) => {
        e.preventDefault();
        // Form sy getting values
        setLoading(true);
        const formData = new FormData(e.target);

        // Form data sy getting them
        const { username, email, password } = Object.fromEntries(formData);

        // console.log(username)
        // VALIDATE INPUTS
        if (!username || !email || !password) {
            setLoading(false);
            return toast.warn("Please enter inputs!");
        }

        if (!avatar.file) {
            setLoading(false);
            return toast.warn("Please upload an avatar!");
        }

        // VALIDATE UNIQUE USERNAME
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username))
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            setLoading(false);
            return toast.warn("Select another username");
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                // username:username   shortcut same hu aik likh do

                // We want to pass id email in database too taky agy search kre easily find krsky
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],      // when we will block we will pass id

            });

            // Creating chats docs
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });


            toast.success("Account created! You can login now!");

        }
        catch (err) {
            setLoading(false)
            console.log(err);
            toast.error(err.message);
        }
        finally {
            setLoading(false);
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