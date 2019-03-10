import axios from "../utils/axios";

export function apiLogin(phone, passwd) {
    console.log("1111");
    return axios.post(`/user/login`, {
        phoneNumber: phone,
        passwd: passwd
    });
}
