import axios from "../utils/axios";

export function apiGetAllProduct() {
    return axios({
        url: `/product/all`,
        method: "get",
        // headers: {
        //   Authorization:
        //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTExIiwiX2lkIjoiNWM4MzZlOWZhN2VkNGQyMmExZGMzNTljIiwiaWF0IjoxNTUyMTIyMDY1LCJleHAiOjE1NTIxMjkyNjV9.iBgOc4HTFcAShiKdXhv1630NpcyC4bE-GTkHZHV6SaA'
        // },
        params: {}
    });
}
