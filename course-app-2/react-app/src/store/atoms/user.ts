import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: {
        username: null,
        password: null,
        id: null,
        isLoading: true
    }
})