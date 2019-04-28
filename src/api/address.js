import axios from "../utils/axios";

export function apiAddAddress(name, tel, post, address, detailAddress) {
    return axios.post(`address/add`, {
        name: name,
        tel: tel,
        post: post,
        address: address,
        detailAddress: detailAddress
    });
}
export function apiUpdateAddress(name, tel, post, address, detailAddress, id) {
    return axios.post(`address/update?id=${id}`, {
        name: name,
        tel: tel,
        post: post,
        address: address,
        detailAddress: detailAddress
    });
}
export function apiGetAddress() {
    return axios.get(`address/all`);
}
export function apiDeleteAddress(id) {
    return axios.post(`address/delete`, {
        id: id
    });
}
