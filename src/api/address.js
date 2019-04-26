import axios from "../utils/axios";

export function apiAddAddress(name, phone, post, address, detailAddress) {
    return axios.post(`address/add`, {
        name: name,
        phone: phone,
        post: post,
        address: address,
        detailAddress: detailAddress
    });
}
export function apiGetAddress() {
    return axios.get(`address/all`);
}
