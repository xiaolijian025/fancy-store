import axios from "../utils/axios";

export function apiGetProduct(pageNum, pageSize) {
    return axios.get(`product/all?pageNum=${pageNum}&pageSize=${pageSize}`);
}
