import axios from 'axios';

export const registerUser = (user) => {
    return axios.post("/api/users", user);
}

export const loginUser = (user) => {
    return axios.post("/api/auth", user);
}

export const getRefreshToken = () => {

}
