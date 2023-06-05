<!--
 * @FileDescription: 主界面
 * @Author: 项黎明
-->
<template>
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/paper.png" width="70" height="70" alt="">
                <span>试题分享平台</span>
            </div>
            <div class="example-container">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="item in urlHist"
                                        :key="item.path"
                                        :to="{ path: item.path }" style="margin-left: 1px; margin-right: 1px;">
                        <div class="top_title">
                            {{item.title}}
                        </div>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>
                <el-avatar class="userAvatar" @click="gotoUser" shape="circle" fit="fill" :size="70" :src="userPhoto" />

                <span>{{userName}}</span>
            </div>

        </el-header>
        <!-- 页面主体区域 -->
        <el-container class="main_container">
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <!-- 侧边栏菜单区域 -->

                <el-menu active-text-color="#ffd04b"
                         background-color="#53b297"
                         text-color="#fff"
                         :router="true">
                    <template v-for="item in menulist">
                        <div :key="item.id" v-if="item.accessAuth>=userType">
                            <!-- 一级菜单（有子菜单） -->
                            <el-sub-menu v-if="item.children && item.children.length" :key="item.id">
                                <template #title>
                                    <span>{{item.authName}}</span>
                                </template>
                                <!-- 二级菜单 -->
                                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                                    <template #title>
                                        <span>{{subItem.authName}}</span>
                                    </template>
                                </el-menu-item>
                            </el-sub-menu>
                            <!-- 一级菜单（无子菜单） -->
                            <el-menu-item v-else :index="'/'+item.path" :key="item.id">
                                <span>{{ item.authName }}</span>
                            </el-menu-item>
                        </div>
                    </template>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体区域 -->
            <el_main>
                <router-view></router-view>
            </el_main>

        </el-container>
    </el-container>
</template>

<script>
    
    export default {
        data() {
            return {
                //用户名
                userName: '',
                userPhoto: '',
                userType: 2,
                about: 'about',
                urlHist: [{title:'tets'}],
                // 左侧菜单数据对象
                menulist: [
                    {
                        authName: '个人中心',
                        id: 100,
                        accessAuth:2,
                        children: [
                            {
                                authName: '个人信息',
                                id: 101,
                                path: 'user'
                            },
                            {
                                authName: '我的上传',
                                id: 102,
                                path: 'uploads'
                            }
                        ]
                    },
                    {
                        authName: '试题库',
                        accessAuth: 2,
                        id: 103,
                        path: 'course'
                    },
                    {
                        authName: '订阅课程',
                        accessAuth: 2,
                        id: 104,
                        path: 'subscriptions'
                    },
                    {
                        authName: '收藏试题',
                        accessAuth: 2,
                        id: 105,
                        path: 'favorites'
                    },
                    {
                        authName: '管理中心',
                        accessAuth: 1,
                        id: 106,
                        children: [
                            {
                                authName: '管理课程',
                                id: 108,
                                path: 'course_manage'
                            },
                            {
                                authName: '管理专业',
                                id: 109,
                                path: 'subject_manage'
                            }
                        ]
                    }
                ]
            }
        },
        // 监听localStorage的数据变化
        mounted() {
            const that = this
            window.addEventListener('setItemEvent', function (e) {
                if (e.key == 'UserData') {
                    let newdata = JSON.parse(e.newValue)
                    that.userName = newdata.name
                    that.userPhoto = newdata.photo
                } else if(e.key == 'UrlHist'){
                    console.log('检测到变化')
                    that.urlHist = JSON.parse(e.newValue)
                }
                
            })
        },
        //创建页面时获取用户名信息
        created() {
            if (localStorage.getItem('UserData')) {
                //console.log('Home页面created方法获取UserData')
                //已登录
                var userData = JSON.parse(localStorage.getItem('UserData'))
                this.userName = userData.name
                this.userType = userData.type
                if (userData.photo) {
                    this.userPhoto = userData.photo
                } else {
                    this.userPhoto = require(`../assets/default_user_photo.png`)
                }
                
            } else {
                //游客
                this.userType = 2
                this.userName = '游客'
                this.userPhoto = require(`../assets/default_user_photo.png`)
            }
        },
        methods: {
            //点击头像跳转到个人信息页
            gotoUser() {
                this.$router.push('/user')
                
            } 
            
        }
    }
</script>

<style lang="less" scoped>
    .home_container {
        height: 100vh;
        padding: 0;
        margin: 0;
    }

    .el-header {
        height: 10vh;
        background-color: #028C6A;
        display: flex;
        justify-content: space-between;
        padding padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        > div

    {
        display: flex;
        align-items: center;
        span

    {
        margin-left: 20px;
        margin-right: 20px;
    }

    }
    }
    .top_title {
        margin-left: 1px;
        margin-right: 1px;
    }

    .main_container {
        padding: 0;
        margin: 0;
        height: 90vh;
    }

    .el-aside {
        width:13vw;
        background-color: #45ac90;
    }

    .el-main {
        width: 87vw;
        background-color: #e9edf1;
    }
    .userAvatar {
        cursor: pointer;
    }
    .top_title {
        color: #FAFAFA;
        font-size: 20px;
    }
</style>

