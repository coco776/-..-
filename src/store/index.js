import app from './app'
import Vue from "vue"
import Vuex from "vuex"
import login from "./login"
import user from './user'
import music from './music'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        app,
        login,
        user,
        music
    }
})
