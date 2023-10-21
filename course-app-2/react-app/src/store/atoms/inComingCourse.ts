import { atom } from "recoil";

export const incomingCourseState = atom({
    key: "incomingCourseState",
    default: {
        _id: "" as string | undefined,
        title: "",
        description: "",
        imageLink: "",
        price: 0 ,
        published: false
    }
});
