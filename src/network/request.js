import axios from "axios";
// import store from "../store/index";
import {vm} from '../main'

export function request(config) {
  const instance = new axios.create({
    // baseURL: "https://netease-cloud-music-api-ivory-iota.vercel.app",
    baseURL: `http://localhost:3000`,
    method: config.method == undefined ? "get" : config.method,
    timeout: 10000,
    withCredentials: true,
  });
  
  // instance.interceptors.request.use(

  //   (config) => {
  //     if (store.state.token) {
  //       config.headers.common['token']  = window.localStorage.getItem('token');
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  instance.interceptors.response.use(
    (response) => {
      if (response.status == 400) {
        vm.$router.push({
          path: "/login",
        });
       console.log("未登录");
        return;
      }
      return response;
    },
   
      (error) => {
        const message = String(error)|| "未知错误"
        return vm.$message.error(message)
      }
    
    
    
  );

  return instance(config);
}
