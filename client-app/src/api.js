import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createUser = payload => api.post(`/createUser`, payload)
export const getAllUsers = () => api.get(`/userList`);
export const deleteUserById = id => api.delete(`/user/${id}`)
export const editUserById = (id, payload) => api.put(`/userEdit/${id}`, payload);

export const getViewUserById = id => api.get(`/viewUser/${id}`)

const apis = {
    createUser,
    getAllUsers,
    deleteUserById,
    editUserById,
    getViewUserById
}

export default apis