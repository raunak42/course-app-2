import { atom } from "recoil";

export const courseState = atom({
    key: "courseState",
    default: {
        title: null,
        description: null,
        imageLink: null,
        price: null,
        published: false,
        id: null,
        isLoading: true
    }
})