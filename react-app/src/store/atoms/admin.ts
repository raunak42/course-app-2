import { atom } from "recoil";

export const adminState = atom({
    key: "adminState",
    default: {
        adminname: "",
        password: "",
        id: "",
        isLoading: true
    }
})