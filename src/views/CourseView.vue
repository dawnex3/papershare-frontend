<!--
 * @FileDescription: 课程列表页面。此页面展示所有课程，也可以搜索特定课程。
 * @Author: 张学博
-->
<template>
    <div class="container">
        <el-header>
            <div class="search">
                <el-input placeholder="请输入课程" class="search_box" type="text" id="input1" v-model="inputValue" clearable></el-input>
                <el-button type="success" round class="search_search" @click="submitForm">搜索</el-button>
            </div>
            <el-select size="large" placeholder="请选择专业" class="choose_major" id="Subject" v-model="subjectName" @change="onSelectionChange">
                <el-option v-for="col in subjectData.length" :key="col" :value="subjectData[col - 1].name">
                    {{ subjectData[col - 1].name }}
                </el-option>
            </el-select>
            <el-button type="success" round class="add_class" @click="gotoAbout">找不到课程？点击添加</el-button>
        </el-header>

        <div>
            <CourseWin class="coursewin" :message="data" />
        </div>
    </div>
    
    
</template>

<script>
    import CourseWin from '../components/CourseWin.vue';
    export default {
        name: 'CourseView',
        components: { CourseWin }, // 声明子组件
        data() {
            return {
                data: [],
                allSubject: [{ id: 0, name: '所有专业' }],
                subjectData: [],
                subjectName: '',
                selectedSubject: 0,
                inputValue: ""
            }
        },
        //进入主页首先获取全部课程和全部专业
        created() {
            this.$axios.get('courses', {})
                .then(response => {
                    this.data = response.data.data
                })
                .catch(error => {
                    if (error.response && error.response.status == 404) {
                        this.data = []
                    }
                });
            this.$axios.get('subjects', {})
                .then(response => {
                    this.subjectData = this.allSubject.concat(response.data.data)
                })
                .catch(error => {
                    console.error(error)
                });
            console.log('已获取课程和专业')
        },
        beforeRouteLeave(to, from, next) {
            if (this.$options.name === 'Home') {
                console.log('Home destroyed');
                this.$destroy();
            }
            next();
        },
        methods: {
            gotoAbout() {
                this.$router.push('/add_course')
            },
            //获取指定专业的课程
            onSelectionChange() {
                const selectedOption = this.subjectData.find(option => option.name === this.subjectName);
                if (selectedOption) {
                    this.selectedSubject = selectedOption.id;
                } else {
                    this.selectedSubject = 0;
                }
                console.log(this.selectedSubject)
                this.submitForm()
            },
            //搜索指定的课程
            submitForm() {
                var params;
                if (this.inputValue == "" && this.selectedSubject == 0) {
                    params = {}
                } else if (this.inputValue != "" && this.selectedSubject == 0) {
                    params = { name: this.inputValue }
                } else if (this.inputValue == "" && this.selectedSubject != 0) {
                    params = { subject_id: this.selectedSubject }
                } else {
                    params = {
                        name: this.inputValue,
                        subject_id: this.selectedSubject
                    }
                }
                this.$axios.get('courses', {
                    params: params
                })
                    .then(response => {
                        this.data = response.data.data
                    })
                    .catch(error => {
                        if (error.response && error.response.status == 404) {
                            this.data = []
                        }

                    });
            },
        },

    }
</script>

<style lang="less" scoped>
        .el-header {
        height: 20vh;
        width: 87vw;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #FFFFFF;
    }

    .coursewin {
        position: fixed;
        left: 17%
    }

    .search {
        margin-left: 5vw;
        margin-right: 5vw;
        height: 5vh;
        width: 30vw;
        display: flex;
        align-items: center;
    }

    .search_box {
        height: 40px;
        width: 20vw;
        font-size: 15px;
        font-family: KaiTi;
    }

    .search_search {
        height: 5vh;
        width: 7vw;
        margin-left: 10px;
        font-size: 1.5vw;
        font-family: KaiTi;
        color: aliceblue;
        border: none;
        cursor: pointer;
    }

        .search_search:hover {
            background-color: rgb(0, 150, 0);
            box-shadow: 0 0 5px #000;
        }

    .choose_major {
        height: 5vh;
        width: 20vw;
        font-size: 1.5vw;
        font-family: KaiTi;
    }

        .choose_major:hover {
            cursor: pointer;
        }

    .add_class {
        margin-left: 2px;
        margin-right: 5vw;
        height: 5vh;
        width: 16vw;
        font-size: 1.5vw;
        font-family: KaiTi;
        color: aliceblue;
        border: none;
        cursor: pointer;
    }

        .add_class:hover {
            background-color: rgb(0, 150, 0);
            box-shadow: 0 0 5px #000;
        }
</style>