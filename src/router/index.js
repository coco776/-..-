import vueRouter from "vue-router"
import Found from './found'
import Detail from './detail'
import Person from './person'
import Video from "./video"
import videoDetail from "./videoDetail"

const router =  new vueRouter({
    routes:[
        {
            path: '/',
            redirect: '/found/personal'
        },
        {
            path:'/login',
            component:() => import('@/views/login/Index'),
            children:[
                {
                    path:'/login',
                    component:() => import('@/views/login/childComps/Login'),
                    meta:{
                        title:"登录"
                    }
                    // component:Login
                },
                {
                    path:"/register", 
                    component: () => import('@/views/login/childComps/Register'),
                    meta:{
                        title:"注册"
                    }
                    // component:Register
                }
            ]
        },
        {
            path:"",
            component:() => import('@/views/Layout/Index.vue'),
            children:[
                Found,
                Detail,
                Person,
               
                {
                    path:"/personalFM",
                    component:() => import('@/views/PersonalFM/Index.vue'),
                    meta:{
                        title:"私人FM",
                        Auth:true,
                        type:0
                    }
                },
                Video,
               
            ]
        },
        videoDetail

        
]
})


router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        next();
    }else{
        if(to.meta.isAuth){
            let token = localStorage.getItem('token');
            if(token == null && token === ''){
                next('/login');
            }else{
                next();
            }
        }else{
            next();
        }
    }
})

export default router;