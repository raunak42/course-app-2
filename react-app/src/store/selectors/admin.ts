import { selector } from "recoil";
import { adminState } from "../atoms/admin";


export const adminnameState = selector({
    key: "adminnameState",
    get: ({ get }) => {
        const state = get(adminState);
        return state.adminname;
    }
});

export const adminPasswordState = selector({
    key: "adminPasswordState",
    get: ({ get }) => {
        const state = get(adminState);
        return state.password;
    }
});

export const adminIdState = selector({
    key: "adminIdState",
    get: ({ get }) => {
        const state = get(adminState);
        return state.id;
    }
});

export const adminIsLoadingState = selector({
    key: "adminIsLoadingState",
    get: ({ get }) => {
        const state = get(adminState);
        return state.isLoading;
    }
});

export const adminDetailsState = selector({
    key: "adminDetailsState",
    get: ({ get }) => {
        const state = get(adminState);
        return state;
    }
});