import { create } from "zustand";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  //   They can block us and we can block them and if they block we cant see their name and avatar same for them
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  // action

  //   If they chanege chat they going to send chatId and userInfo
  changeChat: (chatId, user) => {
    // If current user is blocked? for that we need to get its id. getState ke baad write what we want to fetch
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED. User is an array
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null, // we are not passing user since we are blocked we cant see user details
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED. We will check our array. Ham ne kisi ko block kia?
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }
    // Final pass the chatId and user
    else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  // One more action. Agar we click on block button of the receiver wahan sy block krte
  changeBlock: () => {
    // We will take previous state
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
