import axios from "axios";

const http = axios.create({
    baseURL: process.env.NODE_ENV == "development" ? "" : "xxx",
    timeout: 5000 // request timeout
});
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
http.interceptors.request.use(
    config => {
        config.headers.common["Authorization"] =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTExIiwiX2lkIjoiNWM4MzZlOWZhN2VkNGQyMmExZGMzNTljIiwiaWF0IjoxNTUyMTMxNzA0LCJleHAiOjE1NTIxMzUzMDR9.DHL6RV3iSg_xFirGfZHk-yLnDCEod5L4wFcuguFWT7A";
        // 修改请求头为表单请求
        config.transformRequest = [
            function(data) {
                // Do whatever you want to transform the data
                let ret = "";
                for (let it in data) {
                    ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ];

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http;
