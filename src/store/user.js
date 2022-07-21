//token和cookie的维护
const state = {
    token : localStorage.getItem("token")?localStorage.getItem("token"):'',
}

const mutations = {
    SET_TOKEN(state, value){
        state.token = value;
        localStorage.setItem('token', value);
        sessionStorage.setItem("isLogin",true);
        state.isLogin = true;
    },
    REMOVE_TOKEN(state){
        localStorage.removeItem('token');
        state.isLogin = false;
        localStorage.removeItem('userID');
        sessionStorage.setItem("isLogin", false);
    },
   
}
const getters = {
    getToken(state){
        if(!state.token){
            state.token = localStorage.getItem('token')
        }
        return state.token;
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    getters
}