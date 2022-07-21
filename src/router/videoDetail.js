export default {
    name:'videoDetail',
    path:"/videoDetail/:id",
    component:()=> import('@/views/VideoDetail/Index.vue'),
    meta:{
        type:5
    }
}