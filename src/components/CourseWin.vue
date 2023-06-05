<!--
 * @FileDescription: 课程列表页面的课程组件。是以网格形式排列的课程。
 * @Author: 张学博
-->
<template>
    <div class="grid-container" ref="gridContainer">
        <div class="grid-row" v-for="row in row_number" :key="row">
            <div style="display: flex; text-align: center; width: 95%;" @click="gotoCourse(jsonData[row -1 ].id)" v-if="row - 1 < jsonData.length">
                <img src="../assets/default_course_photo.jpg" size="50px" style="width: 180px; height: 140px; margin-left: 30px; margin-top: 10px;">
                <div style="width: 600px; margin-left: 50px; display: flex; flex-direction: column;">
                    <div class="class_name" style="font-size: 20px;font-weight:bold; margin-bottom:30px">课程名称：{{ jsonData[row - 1].name }}</div>
                    <div class="class_teacher" style="font-size: 15px; margin-bottom: 30px">课程教师：{{jsonData[row - 1].teachers}}</div>
                    <div class="class_intro" style="font-size: 15px; margin-bottom: 30px">课程简介：{{ jsonData[row - 1].describe }}</div>
                </div>
                <div style="font-size: 20px; width: 40px; margin-left: 50px; display: flex;"> 
                    <Star style="font-size: 15px; margin-top: 55px" class="star" @click="star(jsonData[row - 1].id)" />
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user_id: (JSON.parse(localStorage.getItem('UserData'))).id,
                //暂时的假数据
                jsonData: [
                ],
                row_number: 6,
                col_number: 1,
            }
        },
        //来自父组件传递的课程列表信息
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
                    console.log('获得课程列表')
                    try {
                        if (newVal) {
                            this.row_number = Math.floor(newVal.length / 1)
                            this.jsonData = newVal
                        }
                    } catch (err) {
                        console.error()
                    }
                }
            }
        },
        methods: {
            //根据course_id跳转到具体课程
            gotoCourse(course_id) {
                this.$router.push('/course/' + course_id)
            },
            //收藏
            star(course_id) {
                this.$axios.post('users/' + this.user_id + '/subscriptions', {
                    course_id: course_id
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        }
    }
</script>
<style scoped lang="less">
    .grid-container {
        position: fixed;
        left: 20%;
        right: 10%;
        bottom: 10%;
        top:30%;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
    }
    

    .grid-row {
        justify-content: center;
        margin: auto;
        width: auto;
        border: 5px solid #ebebeb;
        padding: 5px;
        background-color: #ffffff;
        font-size: 10px;
    }

    .search_search {
        flex-grow: 1;
        display: flex;
        background-color: #45ac90;
        border: 1px solid #f8f6f6;
        text-align: left;
    }

    .photo {
        height: auto;
        width: 10vw;
        border: 2px solid green;
    }

    .class_photo {
        flex: 1;
    }

    .class_introduction {
        flex: 1;
        font-size: 15px; /* 设置字体大小 */
        font-family: Arial, sans-serif; /* 设置字体样式 */
        text-align: left; /* 设置文字左对齐 */
    }

    .star {
        width: 20px;
        height: 20px;
        color: rgb(235, 132, 132);
    }
</style>