import { atom } from "recoil";

export const personState = atom({
    key: "personState",
    default: {
        username: "",
        password: "",
        isLoading: true
    }
})