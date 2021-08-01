import {
    CREATE_CONTACT,
    RETRIEVE_CONTACT,
    RETRIEVE_CONTACT_LOADING,
    UPDATE_CONTACT,
    DELETE_CONTACT,
} from "../actions/types";

const initialState = [];

const contactReducer = (contact = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_CONTACT_LOADING:
            return [...contact, payload]

        case CREATE_CONTACT:
            return [...contact, payload];

        case RETRIEVE_CONTACT:
            return payload;

        case UPDATE_CONTACT:
            return contact.map((contact) => {
                if (contact.id === payload.id) {
                    return {
                        ...contact,
                        ...payload,
                    };
                } else {
                    return contact;
                }
            });

        case DELETE_CONTACT:
            return contact.filter(({ id }) => id !== payload.id);

        default:
            return contact;
    }
};

export default contactReducer;
