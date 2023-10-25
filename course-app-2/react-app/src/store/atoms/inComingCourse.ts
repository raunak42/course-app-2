import { atom } from "recoil";

export const incomingCourseState = atom({
    key: "incomingCourseState",
    default: {
        _id: "",
        title: "",
        description: "",
        imageLink: "",
        price: 0 ,
        published: false
    }
});
