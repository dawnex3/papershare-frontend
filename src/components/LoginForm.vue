<!--
 * @FileDescription: 登录页面的登录框组件
 * @Author: 轩广哲
-->
<template>
    <div class="login-form-wrapper">
        <el-form :model="form" :rules="rules" ref="loginForm">
            <el-form-item prop="userid">
                <el-input prefix-icon="User" v-model="form.userid" placeholder="学号" class="input-long">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="Lock" type="password" v-model="form.password" placeholder="密码" class="input-long">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginForm" class="btn">登录</el-button>
                <el-button @click="registerSkip" class="btn">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { ElForm, ElFormItem, ElInput, ElButton, ElMessageBox } from 'element-plus';

    export default {
        name: 'LoginForm',
        components: {
            ElForm,
            ElFormItem,
            ElInput,
            ElButton,
        },
        data() {
            return {
                form: {
                    userid: '',
                    password: '',
                },
                rules: {
                    userid: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度为6~20位', trigger: 'blur' }
                    ],
                },
                //假数据
                testUserData: {
                    id: 1000,
                    name: '小红',
                    type: 1,
                    isbanned: false,
                    photo: '',
                    subscriptions: [100,101,102],
                    favorites: [100,101,102]
                }
            };
        },
        methods: {
            loginForm() {
                this.$axios
                    .post('/auth/login', {
                        student_id: parseInt(this.form.userid),
                        password: this.form.password
                    })
                    .then(successResponse => {
                        //注意是两个data！！
                        const token = successResponse.data.data.token
                        const id = successResponse.data.data.id
                        localStorage.setItem('Token', `Bearer ${token}`)
 
                        this.$axios
                            .get('/users', {
                                params: {
                                    id:id
                                }
                            })
                            .then(successResponse => {
                                localStorage.setItem('UserData', JSON.stringify(successResponse.data.data[0]))
                                if (successResponse.data.code === 200) {
                                    this.$message.info('登录成功');
                                    this.$router.push('/home')
                                }
                            })
                    })
                    .catch(failResponse => {
                        ElMessageBox.alert('请检查账户和密码是否正确，若无账号请先注册。', '登录失败')
                        console.log(failResponse)
                        //没有后端，直接假登录
                        //localStorage.setItem('Token', 'testtoken')
                        //localStorage.setItem('UserData', JSON.stringify(this.testUserData))
                        //this.$router.push('/home')
                    })
            },
            registerSkip() {
                // 触发自定义事件，将注册组件注册到父组件中，并通过 $emit() 函数向父组件传递事件
                this.$emit('replace-component', 'RegisterForm');
            },
        }
    }
</script>
<style scoped>
    .btn {
        background-color: #429466; /* 设置背景颜色为绿色 */
        border-color: #429466; /* 设置边框颜色为绿色 */
        color: white; /* 设置文字颜色为白色 */
        width: 45%;
    }

    .login-form-wrapper {
        box-sizing: border-box;
        width: 30%;
        min-width: 300px;
        padding: 20px;
        border: solid 1px #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px #ccc;
        background-color: white;
    }

    .input-long {
        width: 300px; /* 修改输入框宽度 */
        height: 40px;
    }

</style>