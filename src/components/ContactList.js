import React, {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteContact,
    retrieveContact,
} from "../actions/contact";

const ContactList = (props) => {
    const [currentContact, setCurrentContact] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [alert, setAlert] = useState(false)

    const contact = useSelector(state => state.contact);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(retrieveContact());
    }, [dispatch])
    useEffect(() => {
        initFetch()
        console.log("ahdjkadjkah ", props)
        // if (!notSubmitted) {
        //     setAlert(true)
        // }


    }, [initFetch])

    const setActiveContact = (contacts, index) => {
        setCurrentContact(contacts);
        setCurrentIndex(index);
    };

    const removeContact = (id) => {
        dispatch(deleteContact(id))
            .then(() => {
                initFetch()
            })
            .catch(e => {
                console.log("error pas delete remove",e);
                initFetch()
            });
    };

    return (
        <div className="list row">
            <h4>Contact List</h4>
            {alert ? (
                <div className="alert alert-success" role="alert">
                    You submitted successfully!
                </div>) : null
            }

            <div className="row">
                {contact &&
                contact.map((contactData, index) => (
                    <div className="col-md-4">
                        <div className="card"
                             style={{
                                 borderWidth: "2px",
                                 borderRadius: "6px",
                                 marginBottom: "10px",
                                 boxShadow: "10px 10px 5px grey"
                             }}
                        >

                            <div className={"card-header bg-light" + (index === currentIndex ? "active" : "")}
                                 onClick={() => setActiveContact(contactData, index)}
                                 key={index}>

                                <div className="d-flex justify-content-between">
                                    {
                                        contactData.photo.endsWith(".jpg" || ".png") ?
                                            <img src={contactData.photo}
                                                 style={{
                                                     width: "30px",
                                                     height: "30px",
                                                     borderRadius: "6px",
                                                     marginRight: "10px"
                                                 }}
                                                 alt={contactData.firstName + " " + contactData.lastName}/> :
                                            <img
                                                src="https://tanzolymp.com/images/default-non-user-no-photo-1.jpg"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "6px",
                                                    marginRight: "10px"
                                                }} alt="No Photo"/>
                                    }


                                    <h5>{contactData.firstName + " " + contactData.lastName}</h5>

                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop">
                                        Detail
                                    </button>
                                </div>
                            </div>
                            <div className="card-body bg-white">

                                <a href={"/contact/" + contactData.id}
                                   className="btn btn-sm btn-warning"
                                   style={{
                                       width: "80px",
                                       marginRight: "10px"
                                   }}>Edit
                                </a>
                                <button className="btn btn-sm btn-danger"
                                        onClick={() => removeContact(contactData.id)}
                                        style={{
                                            width: "80px",
                                            marginRight: "10px"
                                        }}>Delete
                                </button>
                                <div><p></p></div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="col-md-6">
                {currentContact ? (
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"
                                        id="staticBackdropLabel"> {currentContact.firstName + " " + currentContact.lastName}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"/>
                                </div>
                                <div className="modal-body">


                                    <div className="row">
                                        <div className="col-4">
                                            {
                                                currentContact.photo.endsWith(".jpg" || ".png") ?
                                                    <img src={currentContact.photo}
                                                         style={{
                                                             width: "150px",
                                                             height: "100px",
                                                             borderRadius: "6px"
                                                         }}
                                                         alt={currentContact.firstName + " " + currentContact.lastName}/> :
                                                    <img
                                                        src="https://tanzolymp.com/images/default-non-user-no-photo-1.jpg"
                                                        style={{width: 150, height: 100}} alt=""/>
                                            }
                                        </div>
                                        <div className="col-8">
                                            <h5>First Name : {currentContact.firstName}</h5>
                                            <h5>Last Name : {currentContact.lastName}</h5>
                                            <h5>Age : {currentContact.age}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div>
                        <br/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
