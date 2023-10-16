import { atom } from "recoil";

export const personState = atom({
    key: "personState",
    default: {
        name: "",
        password: "",
        isLoading: true
    }
})