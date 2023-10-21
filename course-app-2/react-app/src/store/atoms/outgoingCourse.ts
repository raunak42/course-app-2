import { atom } from "recoil";

export const outgoingCourseState = atom({
    key: "outgoingCourseState",
    default: {
        _id: "" as string | undefined,
        title: "",
        description: "",
        imageLink: "",
        price: 0,
        published: false
    }
});
