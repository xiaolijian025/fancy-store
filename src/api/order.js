import axios from "../utils/axios";

export function apiAddOrder(id, address, price, status) {
    return axios.post(`order/add`, {
        id: id,
        address: address,
        price: price,
        status: status
    });
}

export function apiGetOrder() {
    return axios.get(`order/all`);
}

export function apiDeleteCart(id) {
    return axios.post(`cart/delete`, {
        id: id
    });
}
export function apiUpdateCart(id, state) {
    return axios.post(`cart/update`, {
        id: id,
        add: state
    });
}
