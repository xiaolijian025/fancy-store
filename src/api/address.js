import axios from "../utils/axios";

export function apiAddAddress(address, phone) {
    return axios.post(`address/add`, {
        address: address,
        phone: phone
    });
}
export function apiGetAddress() {
    return axios.get(`address/all`);
}
