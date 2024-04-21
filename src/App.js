import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  // const user = false;

  useEffect(() => {
    // cleanup function
    const unSub = onAuthStateChanged(auth, (user) => {
      // console.log(user); // getting all details
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  console.log(currentUser);
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}

      <Notification />
    </div>
  );
}

export default App;
