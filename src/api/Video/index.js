import { request } from "../../network/request";
//获取视频所有列表
export function getVideoAllList(offset=0){
    return request({
        url:'/video/timeline/all',
        params:{
            offset
        }
    })
}
//获取视频详情
export function getVideoDetail(id){
    return request({
        url:'/video/detail',
        params:{
            id
        }
    })
}
// 获取视频src
export function getVideoUrl(id){
    return request({
        url:'/video/url',
        params:{
            id
        }
    })
}

// 获取相关视频
export function getRelatedVideo(id){
    return request({
        url:'/related/allvideo',
        params:{
            id
        }
    })
}