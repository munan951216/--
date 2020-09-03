import request from "./request"
// 获取轮播
export function getBanners() {
    return request({
        url: "api/app/banner",
        method: "GET"
    })
}
// 获取名师阵容数据
export function getTeacher() {
    return request({
        url: "api/app/recommend/appIndex",
        method: "GET"
    })
}
// 获取用户信息
