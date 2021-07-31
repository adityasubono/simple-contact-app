import {
    CREATE_CONTACT,
    RETRIEVE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT
} from "./types";

import ContactDataService from "../services/ContactService";

export const createContact = (firstName,lastName,age,photo) => async (dispatch) => {
    try {
        const res = await ContactDataService.create({ firstName,lastName,age,photo });

        dispatch({
            type: CREATE_CONTACT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveContact = () => async (dispatch) => {
    try {
        const res = await ContactDataService.getAll();
        dispatch({
            type: RETRIEVE_CONTACT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateContact = (id, data) => async (dispatch) => {
    try {
        const res = await ContactDataService.update(id, data);

        dispatch({
            type: UPDATE_CONTACT,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        await ContactDataService.remove(id);

        dispatch({
            type: DELETE_CONTACT,
            payload: { id },
        });
    } catch (err) {
        console.log("error pas delete",err.response);
    }
};
