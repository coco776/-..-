import {request} from "../../network/request.js"
//二维码登录涉及到 3 个接口,调用务必带上时间戳,防止缓存
//获取key
export function getQRkey(){
    console.log('我被调用咯');
    return request({
        url:`/login/qr/key?timerstamp=${Date.now()}`
    })
}
// 根据key 可生成二维码图片的 base64 和二维码信息
//qrimg 传入后会额外返回二维码图片 base64 编码
export function getQRcode(key){
   return  request({
        url:`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    })
}
//获取二维码扫码状态
export function getQRstate(key){
     return request({
        url:`/login/qr/check?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    })
}
export function getTest(){
    return  request({
        url:'search?keywords=海阔天空'
    })
}

