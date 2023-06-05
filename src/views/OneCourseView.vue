<!--
 * @FileDescription: 单个课程的页面。展示课程的试题列表。
 * @Author: 刘嘉政
-->
<template>
    <el-header style="width:85vw; margin-top: 2vh; justify-content: center;
         align-items: center;">
        <div class="course-info-box">
            <div style="font-size: 20px; display: flex; justify-content: center;">
                <div>
                    {{this.courseData.name}} <br />
                </div>
            </div>
            <br />
            <div style="font-size: 15px; display: flex; justify-content: center;">
                <div>
                    所属专业：   {{this.subjectName}} <br />
                </div>
            </div>
            <div style="font-size: 15px; display: flex; justify-content: center;">
                <div>
                    教师：         {{this.courseData.teachers}} <br />
                </div>
            </div>
            <div style="font-size: 15px; display: flex; justify-content: center;">
                <div>
                    课程描述：  {{this.courseData.describe}}
                </div>
            </div>
        </div>
        <div class="button-box">
            <el-button @click="subscribe" type="success" style="top: 32vh; margin-bottom: 30px; position: fixed; right: 20%;">
                <div style=" display: flex;">
                    <CirclePlus style="width: 20px; height: 20px; color: rgb(121, 121, 121); margin-right: 8px;" />
                    <div style="font-size: 12px; margin-top: 3px; color: rgb(0, 0, 0);" :key="this.subscribed">
                        <div v-if="this.subscribed">
                            已订阅
                        </div>
                        <div v-else>
                            订阅课程
                        </div>
                    </div>
                </div>
            </el-button>
            <el-button @click="upload" type="success" style="top: 32vh; margin-bottom: 30px; position: fixed; right: 10%">

                <DocumentAdd style="width: 20px; height: 20px; color: rgb(121, 121, 121); margin-right: 8px;" />
                <div style="font-size: 12px; margin-top: 3px; color: rgb(0, 0, 0);">上传试题</div>
            </el-button>
            <AddPaper ref="visibleDialog"></AddPaper>
        </div>
    </el-header>

    <el-container>
        <PaperWin class="paperWin" :message="papers" />
    </el-container>
</template>

<script>
    import { ref } from 'vue'
    import AddPaper from "../components/AddPaper.vue"
    import PaperWin from "../components/PaperWin.vue";
    import { ElButton } from "element-plus";
    import { updateTitle } from '../utils/rememberRoute.js';
    export default {
        name: 'OneCourseView',
        components: {
            ElButton, PaperWin, AddPaper
        },
        data() {
            return {
                papers: [],
                userData: {},
                courseData: {},
                subjectName: '',
                subscribed: false,
                visibleDialog: ref(null)
            }
        },
        created() {
            console.log('进入课程详情页')
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
            var course_id = parseInt(this.$route.params.course_id)
            if (this.userData.subscriptions.includes(course_id)) {
                this.subscribed = true
            } else {
                this.subscribed = false
            }
            //获取课程信息
            this.$axios.get('courses', {
                params: {
                    id: course_id
                }
            })
                .then(response => {
                    this.courseData = response.data.data[0]
                    //面包屑
                    updateTitle(this.courseData.name)
                    //查找所属专业
                    this.$axios.get('subjects', {})
                        .then(response => {
                            const subject = response.data.data.find(option => option.id === this.courseData.subject_id);
                            if (subject) {
                                this.subjectName = subject.name;
                            } else {
                                this.subjectName = '';
                            }
                        })
                        .catch(error => {
                            console.error(error)
                        });
                })
                .catch(error => {
                    this.courseData = {}
                    console.error(error)
                });
            //获取试题
            this.$axios.get('papers', {
                params: {
                    course_id: course_id
                }
            })
                .then(res => {
                    this.papers = res.data.data
                })
                .catch(error => {
                    console.log(error);
                    this.papers = []
                })

        },
        methods: {
            //上传
            upload() {
                this.$refs.visibleDialog.dialogVisble = ref(true)
                this.$refs.visibleDialog.course_id = this.courseData.id
            },
            //订阅
            subscribe() {
                if (!this.subscribed) {
                    this.$axios.post('users/' + this.userData.id + '/subscriptions', {
                        course_id: this.courseData.id
                    })
                        .then(response => {
                            console.log(response)
                            this.subscribed = true
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    this.$axios.delete('users/' + this.userData.id + '/subscriptions/' + this.courseData.id, {})
                        .then(response => {
                            console.log(response)
                            this.subscribed = false
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .course-info-box {
        border: 1px solid #21ed12; /* 边框样式 */
        padding: 20px; /* 内间距 */
        border-radius: 5px; /* 边框圆角 */
        box-shadow: 0 0 5px rgba(14, 44, 0, 0.1); /* 边框阴影 */
        width: 67vw;
        height: 14vh;
        justify-content: center;
    }

    .el-header {
        height: 19vh;
        display: flex;
        justify-content: center;
    }

    .user_info {
        position: fixed;
        top: 0%;
        right: 0%;
        width: 200px;
        height: 80px;
        background-color: rgb(31, 184, 0);
        display: flex;
        justify-content: center;
    }

    .container {
        // justify-content: center;
        // margin: auto;
        position: fixed;
        top: 38%;
        left: 20%;
        right: 10%;
        // bottom: 10%;
        // width: 100%;
        height: 58vh;
        overflow: auto;
        background-color: #ffffff;
        scrollbar-color: rgba(88, 225, 76, 0.3) transparent; /* 滑块颜色 滚动条背景颜色 */
        scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
        &::-webkit-scrollbar

    {
        width: 6px;
        height: 6px;
    }

    // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
    &::-webkit-scrollbar-button {
        display: none;
    }

    // 滚动条的轨道（里面装有Thumb）
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    // 滚动条的轨道（里面装有Thumb）
    &::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }

    // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
    &::-webkit-scrollbar-thumb {
        background: rgba(71, 145, 88, 0.8);
        cursor: pointer;
        border-radius: 4px;
    }

    // 边角，即两个滚动条的交汇处
    &::-webkit-scrollbar-corner {
        display: none;
    }

    // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
    &::-webkit-resizer {
        display: none;
    }

    }

    .list_paper {
        border: 1px solid #cccccc;
    }

    .item_paper {
        justify-content: center;
        margin: auto;
        width: auto;
        border: 5px solid #ebebeb;
        padding: 5px;
        background-color: #ffffff;
        font-size: 10px;
    }

        .item_paper:hover {
            background-color: #95d2bb;
        }

    .avatar {
        border-radius: 12px;
        size: 30px;
        width: 24px;
        height: 24px;
    }

    .button_font {
        font-size: 12px;
        margin-top: 3px;
        color: rgb(0, 0, 0);
    }

        .button_font:hover {
            color: rgb(0, 153, 255);
        }
</style>
