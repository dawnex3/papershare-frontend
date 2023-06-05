// @FileDescription: 路由与路由拦截
// @Author: 项黎明
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemoView from '../views/DemoView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import CourseView from '../views/CourseView.vue'
import AddCourse from '../components/AddCourse.vue'
import OneCourseView from '../views/OneCourseView.vue'
import PaperView from '../views/PaperView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import SubscribeView from '../views/SubscribeView.vue'
import FavorView from '../views/FavorView.vue'
import UserUploadView from '../views/UserUploadView.vue'
import CourseManageView from '../views/CourseManageView.vue'
import SubjectManageView from '../views/SubjectManageView.vue'

import { ElMessageBox } from 'element-plus';
import { rememberHist } from "../utils/rememberRoute.js";


const routes = [
    //重定向
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/course',
        component: HomeView,
        children: [
            { path: '/about', component: AboutView },
            { path: '/demo', component: DemoView },
            { path: '/course', component: CourseView, meta: {title:'试题库'}},
            { path: '/add_course', component: AddCourse, meta: {title: '添加课程'}},
            { path: '/course/:course_id', component: OneCourseView, meta: { title: '课程' }},
            { path: '/paper/:paper_id', component: PaperView, meta: { title: '试题' }},
            { path: '/user', component: UserInfoView, meta: { title: '个人信息' }},
            { path: '/subscriptions', component: SubscribeView, meta: { title: '我的订阅' }},
            { path: '/favorites', component: FavorView, meta: { title: '我的收藏' }},
            { path: '/uploads', component: UserUploadView, meta: { title: '我的上传' }},
            { path: '/course_manage', component: CourseManageView, meta: { title: '课程管理' }},
            { path: '/subject_manage', component: SubjectManageView, meta: { title: '专业管理' }}
        ]
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


// 路由导航守卫 拦截需要登录的页面 
router.beforeEach((to, from, next) => {
    //记住url历史(面包屑)
    rememberHist(to)
    //需要token的url
    if (to.path == '/user' || to.path == '/subscriptions' || to.path == '/favorites') {
        const token = localStorage.getItem('Token')
        if (!token) {
            ElMessageBox.confirm(
                '你尚未登录。',
                '提示',
                {
                    confirmButtonText: '前往登录',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
                .then(() => {
                    return next('/login')
                })
        } else {
            return next()
        }
    } else {
        return next()
    }

})

export default router
