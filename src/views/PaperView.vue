<!--
 * @FileDescription: 单个试题的页面。包括试题，题解，评论。
 * @Author: 刘嘉政
-->
<template>
    <div class="container">
        <el-header style="width:85vw;height:10vh; margin-top: 2vh; justify-content: center; align-items: center;">
            <div class="paper-info-box">
                <div style="font-size: 20px; display: flex; justify-content: center;">
                    <div>
                        {{this.paperData.name}} <br />
                    </div>
                </div>
                <br />
                <div style="font-size: 15px; display: flex; justify-content: center;">
                    <div>
                        年份：   {{this.paperData.year}} <br />
                    </div>
                </div>
            </div>

            <div style="display: flex; margin-top: 5px;">

                <el-button @click="favor" type="success" style="margin-left: 10px; margin-right: 10px; height: 34px; right: 30%; ">
                    <div style=" display: flex;">
                        <Star style="width: 20px; height: 20px; color: rgb(121, 121, 121); margin-right: 8px;" />
                        <div style="font-size: 12px; margin-top: 3px; color: rgb(0, 0, 0);" :key="this.favored">
                            <div v-if="this.favored">
                                已收藏
                            </div>
                            <div v-else>
                                收藏试题
                            </div>
                        </div>
                    </div>
                </el-button>

                <el-button @click="download()" type="success" style="margin-left: 10px; margin-right: 10px;height:34px; right: 20%;">
                    <div style=" display: flex;">
                        <Download style="width: 20px; height: 20px; color: rgb(121, 121, 121); margin-right: 8px;" />
                        <div style="font-size: 12px; margin-top: 3px; color: rgb(0, 0, 0);">下载{{this.activeName}}</div>
                    </div>
                </el-button>

                <el-upload action="" :http-request="uploadFile" :show-file-list="false">
                    <el-button type="success"  style="margin-left: 10px; margin-right: 10px; height: 34px; right: 10%; ">
                        <div style="font-size: 12px; margin-top: 2px; color: rgb(0, 0, 0);"> 上传题解 </div>
                    </el-button>
                </el-upload>

            </div>
            <el-tabs style="width: 82vw; height: 80vh; margin-top: 10px;" type="border-card" v-model="activeFile" @tab-click="changeView">
                <el-tab-pane :name="this.paperData.paper_id" label="试题" :editable="false" stretch>
                    <iframe id="pdfPlayer" :src="this.$axios.defaults.baseURL+'/files/'+this.paperData.paper_id +'/view'" frameborder="0" style="width:81vw; height: 70vh; margin-top: 2px;"></iframe>
                </el-tab-pane>
                <el-tab-pane v-for="(file_id,index) in this.paperData.answers" :key="index" :label="'答案'+index"
                             :name="file_id" :editable="false" :lazy="true" stretch>
                    <iframe id="pdfPlayer" :src="this.$axios.defaults.baseURL+'/files/'+file_id+'/view'" frameborder="0" style="width: 81vw; height: 70vh; margin-top: 2px;"></iframe>
                </el-tab-pane>
            </el-tabs>

            <div >
                <!---->
                <comments>  </comments>
            </div>
        </el-header>
        

        

    </div>



</template>

<script>
    import { ElButton } from "element-plus";
    import comments from "../components/CommentsInfo.vue"
    import { updateTitle } from '../utils/rememberRoute.js';
    export default {
        components: {
            comments,
            ElButton
        },
        name: 'PaperView',
        data() {
            return {
                activeFile:0,
                activeName:'试题',
                favored: false,
                userData: {},
                paperData: {},
                paper_demo: {
                    paper_name: '2023高等数学一',
                    paper_id: 1010,

                    preview_img: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.s1eCPU6cyyIdKU-vxU7vEQHaJb?w=197&h=251&c=7&r=0&o=5&dpr=1.5&pid=1.7',
                    upload_time: '2023年5月1日',
                    uploader: 'liu',
                    uploader_id: 1120201901,

                    download_num: 1355,
                    view_num: 22323,
                    comment_num: 182,
                    like_num: 536,
                    star_num: 1047,
                },
            }
        },
        created() {
            console.log('进入试题详情页')
            var paper_id = parseInt(this.$route.params.paper_id)
            this.reload(paper_id)
            
        },
        methods: {
            reload(paper_id) {
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
                if (this.userData.favorites.includes(paper_id)) {
                    this.favored = true
                } else {
                    this.favored = false
                }

                //获取试题信息
                this.$axios
                    .get('papers', {
                        params: {
                            id: paper_id
                        }
                    })
                    .then(response => {
                        this.paperData = response.data.data[0]
                        //面包屑
                        updateTitle(this.paperData.name)
                        //默认预览试题
                        this.activeFile = this.paperData.paper_id
                        this.activeName = '试题'
                    })
                    .catch(error => {
                        this.paperData = {}
                        console.error(error)
                    });
            },
            //预览
            changeView(tab, event) {
                console.log(tab,event)
                this.activeName=tab.props.label
            },
            //下载
            async download() {
                this.$axios
                    .get('/files/'+this.activeFile+'/download', {})
                    .then(response => {
                        console.log(response.status)
                        const content = response
                        const blob = new Blob([content])
                        if ("download" in document.createElement("a")) {
                            // 非IE下载
                            const elink = document.createElement("a");
                            elink.download = this.activeName + '.pdf';
                            elink.style.display = "none";
                            elink.href = URL.createObjectURL(blob);
                            document.body.appendChild(elink);
                            elink.click();
                            URL.revokeObjectURL(elink.href); // 释放URL 对象
                            document.body.removeChild(elink);
                        } else {
                            // IE10+下载
                            navigator.msSaveBlob(blob, this.activeName + '.pdf');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.$message.error('下载失败');
                    })
                
            },
            //上传题解
            uploadFile(params) {
                var formData = new FormData();
                formData.append('type', '1');
                formData.append('uploader', this.userData.id);
                formData.append('paper_id', this.paperData.id);
                formData.append('file', params.file);
                this.$axios
                    .post('/files', formData)
                    .then(successResponse => {
                        console.log(successResponse.status)
                        this.$message.info('上传成功')
                        this.reload(this.paperData.id)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                
            },
            //收藏
            favor() {
                if (!this.favored) {
                    this.$axios.post('users/' + this.userData.id + '/favorites', {
                        paper_id: this.paperData.id
                    })
                        .then(response => {
                            console.log(response)
                            this.$message.info('收藏成功')
                            this.favored = true
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message.error('收藏失败')
                        });
                } else {
                    this.$axios.delete('users/' + this.userData.id + '/favorites/' + this.paperData.id, {})
                        .then(response => {
                            console.log(response)
                            this.$message.info('取消收藏成功')
                            this.favored = false
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message.error('取消收藏失败')
                        });
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .container_img {
        position: relative;
        // top: 20%;
        // bottom: 100px;
        height: 400px;
        width: 80%;
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

    .container {
        position: fixed;
        // top: 30%;
        left: 15%;
        // right: 10%;
        width: 85%;
        // bottom: 20%;
        height: 725px;
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