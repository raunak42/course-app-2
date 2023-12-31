import { selector } from "recoil";
import { outgoingCourseState } from "../atoms/outgoingCourse";

export const titleState = selector({
    key: "titleState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state.title;
    }
});
export const descriptionState = selector({
    key: "descriptionState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state.description;
    }
});
export const imageLinkState = selector({
    key: "imageLinkState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state.imageLink;
    }
});
export const priceState = selector({
    key: "priceState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state.price;
    }
});
export const idState = selector({
    key: "idState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state._id;
    }
});
export const publishedState = selector({
    key: "publishedState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state.published;
    }
});
// export const courseIsLoadingState = selector({
//     key: "courseIsLoadingState",
//     get: ({ get }) => {
//         const state = get(outgoingCourseState);
//         return state.isLoading;
//     }
// });
export const courseDetailsState = selector({
    key: "courseDetailsState",
    get: ({ get }) => {
        const state = get(outgoingCourseState);
        return state;
    }
});