import { UserActionTypes } from "./user.types";

export const setCurrenUser = user => ({
    type: UserActionTypes.SET_CURREN_USER,
    payload: user
});