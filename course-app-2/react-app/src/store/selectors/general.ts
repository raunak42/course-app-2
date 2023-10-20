import { selector } from "recoil";
import { personState } from "../atoms/general";

export const usernameState = selector({
    key: "nameState",
    get: ({ get }) => {
        const state = get(personState);
        return state.username;
    }
});

export const passwordState = selector({
    key: "passwordState",
    get: ({ get }) => {
        const state = get(personState);
        return state.password;
    }
});

export const personIsLoadingState = selector({
    key: "personIsLoadingState",
    get: ({ get }) => {
        const state = get(personState);
        return state.isLoading;
    }
});

export const personDetails = selector({
    key: "personDetails",
    get: ({ get }) => {
        const state = get(personState);
        return state;
    }
});

