import {request} from "../../network/request"

export function getUserDetail(id){
    return request({
        url:`/user/detail?uid=${id}`,
        
    })
}

//关注、取消关注
export function follow(id, t=1){
    return request({
        url:'follow',
        params:{
            id,
            t
        }
    })
}

//type为1则返回周记录
export function createListInfo(id,type=1){
    return request({
        url:`/user/record?uid=${id}&type=${type}`
    })
}

// 评论功能
export function postComment(params){
   let  {t, type, id, content, commentId} = params;
   if(commentId){
       console.log("我进这里啦 为什么请求出错嘛");
    return request({
        url:"/comment",
        params
    })
   }else{
    return request({
        url:"/comment",
        params:{
            t,
            type,
            id,
            content
        }
    })
   }
    
}
// 点赞评论
export function likeComment(id, cid, t, type){
    return request({
        url:'/comment/like',
        params:{
            id, 
            cid,
            t,
            type
        }
    })
}