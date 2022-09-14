import {request} from '../../network/request.js'

export function getMusicUrl(id){
    return request({
        url:'/song/url',
        params:{
            id
        }
    })
}

//获取私人FM歌单
export function getMusicFM(){
    return request({
        url:'/personal_fm' ,
        params:{
            timestamp:Date.now()
        }
    })
}

// 获取歌词
export function getLyrics(id){
    return request({
        url:"/lyric",
        params:{
            id
        }
    })
}

//收藏歌单
export function collectSongList(id, t){
    return request({
        url:"/playlist/subscribe",
        params:{
            id,
            t,
            timestamp:Date.now(),
            cookie:localStorage.getItem("cookie")
        }
    })
}