import { selector } from "recoil";
import { incomingCourseState } from "../atoms/inComingCourse";
export const ItitleState = selector({
    key: "ItitleState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state.title;
    }
});
export const IdescriptionState = selector({
    key: "IdescriptionState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state.description;
    }
});
export const IimageLinkState = selector({
    key: "IimageLinkState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state.imageLink;
    }
});
export const IpriceState = selector({
    key: "IpriceState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state.price;
    }
});
export const IidState = selector({
    key: "IidState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state._id;
    }
});
export const IpublishedState = selector({
    key: "IpublishedState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
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
export const IcourseDetailsState = selector({
    key: "IcourseDetailsState",
    get: ({ get }) => {
        const state = get(incomingCourseState);
        return state;
    }
});