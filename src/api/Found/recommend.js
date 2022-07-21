import {request} from "../../network/request"

export function getBanner(){
    return request({
        url:`/banner`
    })
}

export function getPersonalized(limit=10){
    return request({
        url:`/personalized?limit=${limit}`
    })
}

export function getClarifyList(clarify,offset=0, limit=40){
    return request({
        url:'/top/playlist',
        params:{
            cat:clarify,
            offset,
            limit
        }
    })
}
//获得所有的榜单总体信息
export function getRankingList(){
    return request({
        url:'/toplist'
    })
}
// 开始api地址写错了 一直没请求对啊服了
//传入榜单id获取歌单信息（局限于id）
export function getRankingListByID(id){
    return request({
        url:`/playlist/detail?id=${id}`
    })
}
//通过歌单id获取歌单详情信息
export function getSongDetail(id){
    return request({
        url:`/song/detail?ids=${id}`,
    })
}

//处理后台返回的歌单信息 重新封装
export class songDetails{
    constructor(obj){
        this.id = obj.id;
        let arr=[];
        obj.ar.forEach(element => {
            arr.push(element.name);
        });
        this.singer = arr.join('/');
        this.album  = obj.al.name;
        this.time = new Date(obj.time);
        this.name = obj.name;
        this.duration = obj.dt;
        this.picUrl  = obj.al.picUrl;
    }
}