<!--
 * @FileDescription: 登录页面的注册框组件
 * @Author: 轩广哲
-->
<template>
    <div class="login-form-wrapper">
        <el-form :model="form" :rules="rules" ref="registerForm">
            <el-form-item prop="username">
                <el-input prefix-icon="EditPen" placeholder="设置用户名" v-model="form.username" class="input-long"></el-input>
            </el-form-item>
            <el-form-item prop="userid">
                <el-input prefix-icon="User" placeholder="设置学号" v-model="form.userid" class="input-long"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="verAcquisition" class="btn">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="Lock" placeholder="设置密码" type="password" v-model="form.password" class="input-long"></el-input>
            </el-form-item>
            <el-form-item prop="verification">
                <el-input prefix-icon="Message" placeholder="验证码" v-model="form.verification" class="input-long"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="registerForm" class="btn">注册</el-button>
                <el-button @click="loginSkip" class="btn">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { ElForm, ElFormItem, ElInput, ElButton, ElMessageBox } from 'element-plus';

    export default {
        name: 'RegisterForm',
        components: {
            ElForm,
            ElFormItem,
            ElInput,
            ElButton,
        },
        data() {
            return {
                form: {
                    username: '',
                    userid: '',
                    password: '',
                    verification: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请设置用户名', trigger: 'blur' },
                    ],
                    userid: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请设置密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度为6~20位', trigger: 'blur' }
                    ],
                    verification: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
            };
        },
        methods: {
            verification() {
            },
            registerForm() {
                this.$axios
                    .post('/auth/register', {
                        student_id: parseInt(this.form.userid),
                        name: this.form.username,
                        password: this.form.password,
                        verify_code: this.form.verification
                    })
                    .then(successResponse => {
                        localStorage.setItem('UserData', JSON.stringify(successResponse.data.data))
                        this.$axios
                            .post('/auth/login', {
                                student_id: parseInt(this.form.userid),
                                password: this.form.password
                            })
                            .then(successResponse => {
                                //注意是两个data！！
                                const token = successResponse.data.data.token
                                localStorage.setItem('Token', `Bearer ${token}`)
                                this.$message.info('注册成功');
                                this.$router.push('/home')
                            })
                            .catch(failResponse => {
                                console.log(failResponse)
                                ElMessageBox.alert('请检查登录信息与验证码是否正确', '注册失败')
                            })
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                        ElMessageBox.alert('请检查登录信息与验证码是否正确', '注册失败')
                    })
            },
            loginSkip() {
                // 触发自定义事件，将注册组件注册到父组件中，并通过 $emit() 函数向父组件传递事件
                this.$emit('replace-component', 'LoginForm');
            }
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