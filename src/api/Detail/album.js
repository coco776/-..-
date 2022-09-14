import {request} from "../../network/request"

export function getAlbum(id){
    return request({
        url:`/album?id=${id}`
    })
}

export function getComments(id, offset=0){
    return request({
        url:`/comment/playlist`,
        //直接写地址为啥不对啊
        params:{
            id,
            offset,
            timestamp: Date.now()
        }
    })
}
export function getHotComment(id, offset=0,type=2){
    return request({
        url:`/comment/hot`,
        params:{
            id,
            offset,
            type,
            timestamp: Date.now()
        }
    })
}

export function getSubscribers(id,offset=0,limit=20){
    return request({
        url:`/playlist/subscribers`,
        params:{
            id,
            limit,
            offset
        }
    })
    
}