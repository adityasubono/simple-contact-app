import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {createContact, updateContact} from "../actions/contact";
import ContactService from "../services/ContactService";
import { useHistory } from "react-router-dom"

const AddEditContact = (props) => {
    let history = useHistory()
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
        isAddMode ?
            addNewContact() : updateContacts()
    };

    const addNewContact = () => {
        const {firstName, lastName, age, photo} = contact;
        dispatch(createContact(firstName, lastName, age, photo))
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
    }

    const updateContacts = () => {
        const {firstName, lastName, age, photo} = contact;
        dispatch(updateContact(contact.id, {firstName, lastName, age, photo}))
            .then(response => {
                console.log(response);
                setSubmitted(true);
                history.push("/contact" , {submitted : true})
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newContact = () => {
        setContact(initialContactState);
        setSubmitted(false);
    };

    useEffect(() => {
        console.log("props" , props)
        if (!isAddMode) {
            const getContact = id => {
                ContactService.get(id)
                    .then(response => {
                        setContact(response.data.data);
                        console.log("auoo",response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            };
            getContact(props.match.params.id)
        }
    }, []);

    return (
        <div className="submit-form">
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            {submitted  ? (
                <div>
                    {isAddMode?
                        <div className="alert alert-success" role="alert">
                            You submitted successfully!
                        </div>
                        :
                        <div className="alert alert-success" role="alert">
                            The contact was updated successfully!
                        </div>
                    }
                    <button className="btn btn-success" onClick={newContact}>
                        Add New Contact
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

export default AddEditContact;
