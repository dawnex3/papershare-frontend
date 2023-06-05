<!--
 * @FileDescription: 个人信息页面。包含登出，修改个人信息等功能。
 * @Author: 刘江浩
-->
<template>
    <div class="page">
        <el-container>
            <el-main>
                <div class="info">
                    <div class="user">
                        <p>个人信息</p>
                        <p class="userId">id:&nbsp;&nbsp;{{ this.userData.id }}</p>
                        <P class="userType">身份： {{ getUserType(this.userData.type) }}</P>
                    </div>
                    <hr class="boundary">
                    <div class="info-detail">
                        <!-- 上传头像 -->
                        <div class="pic">
                            <span>
                                <el-icon class="icon">
                                    <Picture />
                                </el-icon>
                            </span>
                            <span class="pic-t">头像</span>
                            <el-upload class="avatar-uploader" action="" :auto-upload="false" :show-file-list="false"
                                       list-type="picture-card" :on-change="uploadChange">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        jpg files ,size less than 2MB
                                    </div>
                                </template>
                            </el-upload>
                        </div>

                        <el-form :model="form" :rules="rules" ref="UserHomepage">
                            <!-- 昵称 -->
                            <div class="nname">
                                <el-form-item>
                                    <span>
                                        <el-icon class="icon">
                                            <User />
                                        </el-icon>
                                    </span>
                                    <span class="nname-t">昵称</span>
                                </el-form-item>
                                <span>
                                    <el-form-item prop="name">
                                        <el-input class="nname-in" v-model="form.name" placeholder="Please input"
                                                  clearable />
                                    </el-form-item>
                                </span>
                                <div class="checkFlag">
                                    <el-icon v-if="nameChangeFlag == 1" color="#35B449"><CircleCheck /></el-icon>
                                    <el-icon v-else-if="nameChangeFlag == 2" color="#f00"><CircleClose /></el-icon>
                                </div>
                            </div>
                            <!-- 密码 -->
                            <div class="userPassword">
                                <el-form-item>
                                    <span>
                                        <el-icon class="icon">
                                            <Lock />
                                        </el-icon>
                                    </span>
                                    <span class="userPassword-t">密码</span>
                                </el-form-item>
                                <span>
                                    <el-form-item prop="password">
                                        <el-input class="userPassword-in" v-model="form.password" placeholder="Please input"
                                                  show-password />
                                    </el-form-item>
                                </span>
                                <div class="checkFlag">
                                    <el-icon v-if="changeFlag == 1" color="#35B449"><CircleCheck /></el-icon>
                                    <el-icon v-else-if="changeFlag == 2" color="#f00"><CircleClose /></el-icon>
                                </div>
                            </div>
                            <!-- 确认密码 -->
                            <div class="userPassword">
                                <el-form-item>
                                    <span>
                                        <el-icon class="icon">
                                            <Lock />
                                        </el-icon>
                                    </span>
                                    <span class="userConfirmPassword-t">确认密码</span>
                                </el-form-item>
                                <span>
                                    <el-form-item prop="confirmPwd">
                                        <el-input class="userPassword-in" v-model="form.confirmPwd"
                                                  placeholder="Please input" show-password />
                                    </el-form-item>
                                </span>
                                <div class="checkFlag">
                                    <el-icon v-if="checkChangeFlag == 1" color="#35B449"><CircleCheck /></el-icon>
                                    <el-icon v-else-if="checkChangeFlag == 2" color="#f00"><CircleClose /></el-icon>
                                </div>
                            </div>
                        </el-form>
                        <span>
                            <div class="but">
                                <!-- 保存 -->
                                <div class="save">
                                    <el-button @click="saveInfo">保存修改</el-button>
                                </div>
                                <!-- 注销账号 -->
                                <div class="logout">
                                    <el-button @click="open">注销账号</el-button>
                                </div>
                                <!-- 退出登录 -->
                                <div class="logout">
                                    <el-button @click="logout">退出登录</el-button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { ElMessageBox } from 'element-plus';
    export default {
        name: 'UserInfoView',
        components: {
        },
        data() {
            //新密码
            let newValValidate = (rule, value, callback) => {
                if (value === this.oldPassword) {
                    this.changeFlag = 2
                    callback(new Error('新密码不能与旧密码一致'))
                    //(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])
                } else if (/^[A-Za-z0-9._~!@#$^&*]{6,20}$/g.test(value)) {
                    this.changeFlag = 1
                    callback()
                } else {
                    this.changeFlag = 2
                    callback(new Error('请输入英文字母大小写、数字和特殊符号的 6-20 位组合'))
                }
            }
            //校验密码
            let equalToPassword = (rule, value, callback) => {
                if (value !== this.form.password) {
                    this.checkChangeFlag = 2
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    this.checkChangeFlag = 1
                    callback()
                }
            }
            //校验昵称
            let nameCheck = (rule, value, callback) => {
                if (value == this.oldName) {
                    this.nameChangeFlag == 2
                    callback(new Error('新昵称不能与旧昵称一致!'))
                } else {
                    this.nameChangeFlag == 1
                    callback()
                }
            }
            return {
                form: {
                    name: '',//修改的昵称
                    password: '',//修改的密码
                    confirmPwd: '',//确认密码
                },
                oldName: '',//旧昵称
                oldPassword: '',//旧密码
                changeFlag: '',
                checkChangeFlag: '',
                nameChangeFlag: '',
                imageUrl: '',//要修改的头像
                files: [], // 复刻文件数据
                imgBase64: '',
                userData: {},

                rules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '昵称长度小于20位', trigger: 'blur' },
                        { validator: nameCheck, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度为6~20位', trigger: 'blur' },
                        { validator: newValValidate, trigger: 'blur' }

                    ],
                    confirmPwd: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { validator: equalToPassword, trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('UserData'))
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                this.oldName = this.userData.name
                this.oldPassword = this.userData.password
                this.imageUrl = this.userData.photo
            },
            //用于上传头像
            uploadChange(file) {
                const isJPG = file.raw.type === 'image/jpeg';
                const isLt2M = file.raw.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    return
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return
                }
                this.imgSaveToUrl(file)
                // 复刻文件信息
                this.files = file.raw
                this.$message.success('上传头像成功');
                console.log(this.files)
            },
            // 获取上传图片的本地URL
            imgSaveToUrl(file) {
                this.imageUrl = URL.createObjectURL(file.raw) //用于上传前的本地预览，
                this.getBase64(file.raw)
                    .then(res => {
                        this.imgBase64 = res
                    })
                    .catch(error => {
                        console.error(error)
                    })
                //console.log('图片预览地址：', this.imageUrl)   //转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
            },
            //获取图片转base64
            getBase64(file) {
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader()
                    let imgResult = ''
                    reader.readAsDataURL(file)
                    reader.onload = function () {
                        imgResult = reader.result
                    }
                    reader.onerror = function (error) {
                        reject(error)
                    }
                    reader.onloadend = function () {
                        resolve(imgResult)
                    }
                })
            },
            // 保存提交信息
            saveInfo() {
                const data = {}
                //是否填入信息
                var flag = false
                data.user_id = this.userData.id
                if (this.imgBase64) {
                    data.photo = this.imgBase64
                    flag = true
                }
                if (this.form.name) {
                    data.name = this.form.name
                    flag = true
                    if (this.form.name == this.oldName) {
                        flag = false
                        this.$message({
                            type: 'error',
                            message: '新昵称不能与旧昵称一致!'
                        });
                    }
                }
                if (this.form.password) {
                    data.password = this.form.password
                    flag = true
                    if (this.form.password == this.oldPassword) {
                        flag = false
                        this.$message({
                            type: 'error',
                            message: '新密码不能与旧密码一致!'
                        });
                    }
                    if (this.form.password !== this.form.confirmPwd) {
                        flag = false
                        this.$message({
                            type: 'error',
                            message: '两次输入密码不一致!'
                        });
                    }
                }
                // PUT接口请求
                if (flag) {
                    this.$axios.put('users/' + this.userData.id, data)
                        .then((response) => {
                            console.log('修改成功')
                            this.$message.info("修改成功")
                            console.log(response.data)
                            //更新数据
                            this.userData = JSON.parse(localStorage.getItem('UserData'))
                            //更新userData
                            this.$axios
                                .get('/users', {
                                    params: {
                                        id: this.userData.id
                                    }
                                })
                                .then(successResponse => {
                                    localStorage.setItem('UserData', JSON.stringify(successResponse.data.data[0]))
                                })
                            this.userData = JSON.parse(localStorage.getItem('UserData'))
                        })
                        .catch((error) => {
                            console.log('修改失败')
                            this.$message.error("修改失败")
                            console.log(error)
                        })
                } else {
                    this.$message({
                        type: 'info',
                        message: '请输入/检查要修改的信息!'
                    });
                }
            },
            open() {
                this.$confirm('此操作将注销账户, 是否继续?', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '注销成功!'
                    });
                    this.logoff()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消注销'
                    });
                });
            },
            //注销
            logoff() {
                this.$axios.delete('/api/users/{user_id}', {
                    user_id: this.userData.id,
                })
                    .then((response) => {
                        console.log('注销成功')
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log('注销失败')
                        console.log(error)
                    })
            },
            //登出
            logout() {
                //确认登出
                ElMessageBox.confirm(
                    '退出后你将需要重新登录。确认要退出吗？',
                    '警告',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                    .then(() => {
                        //清除缓存
                        this.$message({
                            type: 'success',
                            message: '登出成功!'
                        });
                        localStorage.clear()
                        this.$router.push('/login')
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    })
            },
            getUserType() {
                if (this.userData.type == 0) {
                    return "超级管理员"
                }
                if (this.userData.type == 1) {
                    return "管理员"
                }
                if (this.userData.type == 2) {
                    return "普通用户"
                }
            },
        }
    }
</script>

<style scoped>
    .page {
        display: flex;
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .user {
        display: flex;
    }

    .userId {
        margin-left: 100px;
    }

    .userType {
        margin-left: 100px;
    }

    .title {
        position: absolute;
        color: #098652;
        text-align: center;
        font-size: 50px;
        font-family: KaiTi;
        margin-top: 10px;
        margin-left: 30%;
    }

    .info {
        margin-left: 20%;
        width: 70%;
        height: 80%;
    }

    .boundary {
        width: 600px;
        height: 5px;
        background-color: #06A47B;
        position: absolute;
    }

    .info-detail {
        width: 100%;
        height: 80%;
        margin-top: 5%;
    }

    .pic {
        display: flex;
        align-items: center;
        width: 70%;
        height: 30%;
        margin-top: 90px;
    }

    .pic-t {
        margin-right: 180px;
    }

    .el-upload__tip {
        color: black;
    }

    .userPassword {
        display: flex;
        align-items: center;
        width: 70%;
        height: 5%;
        margin-top: 20px;
    }

    .userPassword-t {
        margin-right: 170px;
    }

    .userConfirmPassword-t {
        margin-right: 142px;
    }

    .nname {
        display: flex;
        align-items: center;
        width: 70%;
        height: 5%;
        margin-top: 60px;
    }

    .nname-t {
        margin-right: 170px;
    }

    .but {
        display: flex;
        padding-top: 15px;
    }

    .save {
        padding-left: 190px;
    }

    .logout {
        margin-left: 30px;
    }

    .icon {
        font-size: 40px;
        text-align: center;
        padding-right: 20px;
    }

    .checkFlag {
        margin-bottom: 12px;
        margin-left: 10px;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
</style>