const state = {
    active:"account"
}
const actions = {
    
}
const mutations = {
    CHANGE_ACTIVE(state,data){
        state.active = data;
    }
}
export default {
    namespaced: true,
    state, 
    actions,
    mutations
}