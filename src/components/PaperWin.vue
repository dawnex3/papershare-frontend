<!--
 * @FileDescription: 试题列表组件。
 * @Author: 刘嘉政
-->
<template>
    <div class="container" ref="container">
        <div class="paper" v-if="papers">
            <div v-for="(paper, i) in papers" :key="i" class="item_paper">
                <div @click="routeto(paper.id)" style="display: flex; text-align: center; width: 95%;">
                    <img :src="paper_demo.preview_img" size="50px" style="width: 200px; height: 150px; margin-left: 30px; margin-top: 10px;">
                    <div style="font-size: 20px; width: 50%; margin-left: 50px; display: flex; flex-direction: column;">
                        <div style="font-size: 20px; font-weight: bold; margin-top: 12px;">
                            {{ paper.name }}
                        </div>
                        <div style="font-size: 15px; margin-top: 20px; display: flex; justify-content: center;">
                            <img src="https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg" class="avatar">
                            <div style="margin-left: 10px; margin-top: 4px;">
                                {{ paper_demo.uploader }}
                            </div>
                        </div>
                        <div style="font-size: 12px; margin-top: 12px;">
                            年份：{{ paper.year }}
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; margin-top: 20px;">
                            <ArrowUpBold @click="like" style="margin-left: 15px; width: 20px; height: 20px; margin-right: 3px; color: rgb(121, 121, 121);" />
                            <div style="font-size: 12px; margin-top: 3px;">{{ paper_demo.like_num }}</div>
                            <ChatDotRound @click="comment" style="margin-left: 15px; width: 20px; height: 20px; margin-right: 3px; color: rgb(121, 121, 121);" />
                            <div style="font-size: 12px; margin-top: 3px;">{{ paper_demo.comment_num }}</div>
                            <Star @click="star" style="margin-left: 15px; width: 20px; height: 20px; margin-right: 3px; color: rgb(121, 121, 121);" />
                            <div style="font-size: 12px; margin-top: 3px;">{{ paper_demo.star_num }}</div>
                        </div>
                        <div style="display: flex; margin-top: 40px;">
                            <Download @click="download" style="margin-left: 15px; width: 20px; height: 20px; margin-left: 18px; margin-right: 8px; color: rgb(121, 121, 121);" />
                            <div class="button_font">下载</div>
                            <View @click="download" style="margin-left: 15px; width: 20px; height: 20px; margin-left: 18px; margin-right: 8px; color: rgb(121, 121, 121);" />
                            <div class="button_font">预览</div>
                            <CloseBold @click="download" v-if="userData.type <= 1" style="margin-left: 15px; width: 20px; height: 20px; margin-left: 18px; margin-right: 8px; color: rgb(121, 121, 121);" />
                            <div v-if="userData.type <= 1" class="button_font">删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-empty v-else description="空空如也" class="empty" />
    </div>
</template>

<script>
    //import { updateTitle } from '../utils/rememberRoute.js';
    export default {
        name: 'PaperWin',
        components: {
        },
        data() {
            return {
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
                papers: [],
                userData: {}
            }
        },
        //来自父组件传递的试题列表信息
        props: {
            message: {
                type: Array,
                required: true,
            }
        },
        //监听列表信息变化
        watch: {
            message: {
                immediate: true,
                handler(newVal) {
                    console.log('获得试题列表')
                    this.papers = newVal
                }
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('UserData'))
        },
        methods: {
            routeto(paper_id) {
                this.$router.push('/paper/' + paper_id);
            }
        },
    }
</script>

<style scoped lang="less">
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
        left: 20%;
        right: 10%;
        bottom: 10%;
        // width: 100%;
        height: 500px;
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
