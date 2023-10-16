import { selector } from "recoil";
import { userState } from "../atoms/user";

export const usernameState = selector({
    key: "usernameState",
    get: ({ get }) => {
        const state = get(userState);
        return state.username;
    }
});

export const userPasswordState = selector({
    key: "userPasswordState",
    get: ({ get }) => {
        const state = get(userState);
        return state.password;
    }
});

export const userIdState = selector({
    key: "userIdState",
    get: ({ get }) => {
        const state = get(userState);
        return state.id;
    }
});

export const userIsLoadingState = selector({
    key: "userIsLoadingState",
    get: ({ get }) => {
        const state = get(userState);
        return state.isLoading;
    }
});

export const userDetailsState = selector({
    key: "userDetailsState",
    get: ({ get }) => {
        const state = get(userState);
        return state;
    }
});