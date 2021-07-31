import http from "../http-common";

const getAll = () => {
    return http.get("/contact");
};

const get = id => {
    return http.get(`/contact/${id}`);
};

const create = data => {
    return http.post("/contact", data);
};

const update = (id, data) => {
    return http.put(`/contact/${id}`, data);
};

const remove = id => {
    return http.delete(`/contact/${id}`);
};

const ContactService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default ContactService;
