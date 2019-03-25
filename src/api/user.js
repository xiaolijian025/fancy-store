import axios from "../utils/axios";

export function apiLogin(user, pwd) {
    return axios.post(`/user/login`, {
        user: user,
        pwd: pwd
    });
}
