export default { 
    path:'/found',
    component:()=>import('@/views/Found/Index'),
    redirect:'/found/personal',
    meta:{isAuth:true},
    children:[
        {
            path:'personal',
            component:() => import('@/views/Found/childComps/Personal.vue'),
            meta:{
                title:"登录"
            } 
        },
        {
            path:'customize',
            component:()=> import('@/views/Found/childComps/Customize.vue')
        },
        {
            path:'songmenu',
            component:()=>import('@/views/Found/childComps/SongMune.vue')
        },
        {
            path:'ranking',
            component:()=>import('@/views/Found/childComps/RankingList.vue')
        }
    ]
}