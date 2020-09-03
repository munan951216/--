import axios from "axios"
import env from "./env.js"
const service = axios.create({
    baseURL: env.prod.baseUrl
})
// 请求拦截
service.interceptors.request.use(config => {
    config.headers['devicetype'] = 'H5'
    return config
},
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(config => {
    return config
},
    error => {
        Promise.reject(error)
    }
)
export default service