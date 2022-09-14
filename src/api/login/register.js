import { request } from "../../network/request"
// 检测手机号是否已经注册
export function isRegister(phone){
    return request({
        url:`/cellphone/existence/check?phone=${phone}`
    })
}

// 注册
export function register(data){
    return request({
      url:`/register/cellphone?phone=${data.phone}&password=${data.password}&captcha=${data.captcha}&nickname=${data.name}`
    })
  }

