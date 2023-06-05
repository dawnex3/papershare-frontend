<!--
 * @FileDescription: 上传试题的弹窗组件。
 * @Author: 项黎明
-->
<template>
    <div class="hello">
        <el-dialog class="title" onmouseover="this.style.boxShadow='0 0 100px rgba(0,0,0,0.5)'"
                   onmouseout="this.style.boxShadow='none'"
                   style=" cursor: pointer;border-radius: 30px; margin-top: 25vh;font-family: KaiTi;font-size:40px;"
                   font-family:KaiTi v-model="dialogVisble" width="30%" :before-close="close">
            <div style="font-family: KaiTi; font-size: 40px;text-align: center;color: black;">添加试题</div>
            <div class="search" style="margin-top: 40px;">
                <div class="search_search"> &nbsp;&nbsp;试题名称 </div>
                <el-input class="box" style="margin-left: 20px;" placeholder="请输入试题名称" type="text" id="input1"
                          v-model="name"></el-input>
            </div>
            <div class="search" style="margin-top: 40px;">
                <div class="search_search"> &nbsp;&nbsp;试题年份 </div>
                <el-input style="margin-left: 20px;" placeholder="请输入试题年份数字" class="search_box1" type="number" id="input1"
                          v-model="year"></el-input>
            </div>
            <el-upload style="border-width: 0; margin-top:40px;" class="avatar-uploader" action="" :auto-upload="false"
                       :show-file-list="false" :on-change="uploadChange">
                <el-button class="bottomButton" type="primary">上传文件</el-button>
            </el-upload>
            <div style="margin-top: 10px;">{{ filename }}</div>
            <template #footer>
                <el-button class="bottomButton" @click="close">取 消</el-button>
                <el-button class="bottomButton" type="primary" @click="confirm">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped>
        /* .box {} */
        .box:focus {
            box-shadow: 1 1 10px #000;
        }

        .avatar-uploader {
            border-width: 0;
        }

        .bottomButton {
            width: 5vw;
            border-radius: 20px;
            font-family: KaiTi;
            font-size: 1vw;
            height: 3vh;
        }

            .bottomButton:hover {
                /* background-color: rgb(255, 255, 255); */
                box-shadow: 0 0 2.5px #000;
            }

        /* .title {
        text-align: center;
        font-size: 10px;
    } */

        .search_search {
            font-family: KaiTi;
            font-size: 1.4vw;
            background-color: rgb(116, 188, 247);
            color: rgb(0, 0, 0);
            border-radius: 10px;
            width: 14vw;
            justify-content: center;
            height: 3.8vh;
        }

            .search_search:hover {
                cursor: pointer;
            }

        .search {
            display: flex;
            /* top: 20% */
        }

        .search1 {
            font-family: KaiTi;
            font-size: 1vw;
        }
</style>
<script>
    import { ref } from 'vue'

    export default {


        data() {
            return {
                filename: "",
                name: "",
                year: 2000,
                dialogVisble: ref(false),
                file: [],
                course_id: 0,
                successUpload: false
            }
        },
        methods: {
            confirm() {
                console.log('上传试题')
                //新建试题
                this.$axios
                    .post('papers', {
                        name: this.name,
                        course_id: this.course_id,
                        year: parseInt(this.year)
                    })
                    .then(response => {
                        //上传文件
                        var paper_id = response.data.data.id
                        var uploader = JSON.parse(localStorage.getItem('UserData')).id
                        var formData = new FormData();
                        formData.append('type', '0');
                        formData.append('uploader', uploader);
                        formData.append('paper_id', paper_id);
                        formData.append('file', this.file.raw);
                        this.$axios
                            .post('/files', formData)
                            .then(response => {
                                //将文件链接到试题
                                this.$axios
                                    .put('papers/' + paper_id, {
                                        paper_id: response.data.data.id
                                    })
                                    .then(res => {
                                        console.log(res);
                                        this.$message.info('上传成功');
                                        this.successUpload = true;
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        this.$message.error('上传失败');
                                    })
                            })
                            .catch((error) => {
                                console.error(error);
                                this.$message.error('上传失败');
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        this.$message.error('上传失败');
                    });
                this.dialogVisble = ref(false)
            },

            close() {
                this.successUpload = 0;
                this.dialogVisble = ref(false)
                this.$message.info('上传取消');
            },
            uploadChange(file) {
                if (file.raw.type != 'application/pdf') {
                    this.$message.error('只能上传pdf!');
                    return
                }
                if (file.raw.size > 15 * 1024 * 1024) {
                    this.$message.error('文件不能超过15MB!');
                    return
                }
                // 复刻文件信息
                this.file = file
                this.filename = file.name
            }
        }
    }
</script>
