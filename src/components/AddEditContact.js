import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../actions/contact";
import ContactService from "../services/ContactService";

const AddContact = (props) => {
    const { id } = props.match.params;
    const isAddMode = !id;
    const initialContactState = {
        id: null,
        firstName: "",
        lastName: "",
        age: "",
        photo: ""
    };
    const [contact, setContact] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };

    const saveContact = () => {
        const { firstName, lastName, age, photo } = contact;

        dispatch(createContact(firstName, lastName,age,photo))
            .then(data => {
                setContact({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    photo: data.photo
                });
                setSubmitted(true);

                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newContact = () => {
        setContact(initialContactState);
        setSubmitted(false);
    };

    const getContact = id => {
        ContactService.get(id)
            .then(response => {
                setContact(response.data);
                console.log("auoo",response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (!isAddMode) {
            getContact(props.match.params.id);
        }
    }, []);

    return (
        <div className="submit-form">
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newContact}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            required
                            value={contact.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            required
                            value={contact.lastName}
                            onChange={handleInputChange}
                            name="lastName"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            required
                            value={contact.age}
                            onChange={handleInputChange}
                            name="age"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="photo"
                            required
                            value={contact.photo}
                            onChange={handleInputChange}
                            name="photo"
                        />
                    </div>

                    <button onClick={saveContact} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddContact;
