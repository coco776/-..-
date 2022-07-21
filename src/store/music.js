const state = {
    // 当前是否在播放
    isPlay:false,
    // 歌曲的位置（用于切换下一首歌曲和上一首歌曲）
    musicIndex:0,
    // 有关当前播放的歌曲的信息
    musicInfo:{
        //为了防止报错都应该设置初始值
        name: "未知歌曲",
        singer: "未知歌手",
        duration: "",
        picUrl: "../assets/img/error_img.png",
        id:'',
        time:0,
    // 歌单列表
    musicList: {}
    }
}
//dispatch
const actions = {
    // 设置当前播放音乐的有关信息
    playMusic(context,  params){
        context.commit('SET_PLAYSTATE', true);
        const index = params.list.findIndex(ele => ele.id == params.musicInfo.id);
        context.commit('SET_MUSICINDEX', index);
        context.commit("SET_MUSICINFO",params.musicInfo);
        context.commit('SET_MUSICLIST', params.list);
        console.log(state.musicInfo);
        console.log(state.musicList);
    }
}
const mutations = {
    //修改isPlay
    SET_PLAYSTATE(state, data){
        state.isPlay = data;
    },
    //修改musicInfo
    SET_MUSICINFO(state, data){
        state.musicInfo = data;
    },
    //修改当前播放歌曲的位置
    SET_MUSICINDEX(state, data){
        state.musicIndex = data;
    },
    //修改歌曲列表
    SET_MUSICLIST(state, data){
        state.musicList = data;
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
};