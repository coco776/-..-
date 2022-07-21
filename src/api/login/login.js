import { request } from "../../network/request.js";

//账号登录
export function loginAccount(loginData) {
  console.log(loginData);
  var isEmail = false;
  const reg = /^\w+@\w+(\.\w+)+$/;
  if (reg.test(loginData.account.trim())) {
    isEmail = true;
  }
  console.log(isEmail);
  const temp = isEmail ? "email" : "phone";
  console.log(temp);
  return request({
    // url: isEmail ? `/login?timestamp=${Date.now()}` : `/login/cellphone?timestamp=${Date.now()}`,
    // url: isEmail ? `/login` : `/login/cellphone`,
    // method: "post",
    // data: {
      // [temp]: loginData.account,
      // password: loginData.password,
    // },
    url: isEmail ?
     `/login/cellphone?email=${loginData.account}&password=${loginData.password}`
     : `/login/cellphone?phone=${loginData.account}&password=${loginData.password}`,
  });
}

export function sendCaptcha(phone){
  return request({
    url:`/captcha/sent?phone=${phone}`
  })
}

export function verifyCaptcha(data){
  return request({
    url:`/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`
  })
}

export function loginCaptcha(data){
  return request({
    url:'/login/cellphone',
    params:{
      phone:data.phone,
      captcha:data.captcha
    }
  })
}
