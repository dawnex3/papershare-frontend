<!--
 * @FileDescription: 添加课程页面。
 * @Author: 张学博
-->
<template>
    <div class="search">
        <div class="search_search">课程名称</div>
        <el-input placeholder="请输入课程名,例如高等数学" class="search_box" type="text" id="input1" v-model="name"></el-input>
    </div>
    <div class="search1">
        <div class="search_search1">教师名称</div>
        <el-input placeholder="XXX" class="search_box1" type="text" id="input1" v-model="teacher"></el-input>
    </div>
    <div>
        <div class="search_search2">专业类别</div>
        <el-select size="large" placeholder="请选择专业" class="choose_major" id="Subject" v-model="subjectName" @change="onSelectionChange">
            <el-option v-for="col in row_number" :key="col" :value="jsonData.data[col - 1].name">
                {{ jsonData.data[col - 1].name }}
            </el-option>
        </el-select>
    </div>
    <el-button type="success" class="submit" @click="submitForm">提交</el-button>
    <el-button type="info" plain class="search_search3" @click="goback">返回</el-button>
</template>

<script>

    export default {
        name: "AddCourse",
        data() {
            return {
                subjectName: '',
                selectedSubject: "",
                teacher: "",
                name: "",
                row_number: 1,
                subjectData: "",
                jsonData: {
                    "code": 0,
                    "message": "string",
                    "data": [
                        {
                            "id": 0,
                            "name": ""
                        }
                    ]
                }
            }
        },
        created() {
            this.$axios.get('/api/subjects', {})
                .then(response => {
                    this.subjectData = response
                })
                .catch(error => {
                    console.error(error)
                });
        },
        watch: {
            subjectData: {
                immediate: true,
                handler(newVal) {
                    try {
                        const json = JSON.parse(newVal)
                        if (json) {
                            this.row_number = Math.floor(json.data.length)
                            this.jsonData = json
                        }
                    } catch (err) {
                        console.error()
                    }
                }
            }
        },
        methods: {
            submitForm() {
                const teachers = [this.teacher]
                this.$axios.post('/api/course', {
                    name: this.name, subject_id: this.selectedSubject, describe: "", teachers: teachers
                })
                    .then(response => {
                        this.data = response
                    })
                    .catch(error => {
                        console.error(error)
                    });
            },
            goback() {
                this.$router.push('/course')
            },
            onSelectionChange() {
                const selectedOption = this.jsonData.data.find(option => option.name === this.subjectName);
                if (selectedOption) {
                    this.selectedSubject = selectedOption.id;
                } else {
                    this.selectedSubject = '';
                }
                console.log(this.selectedSubject)
            },
        }
    }
</script>

<style scoped>
    .submit {
        top: 80%;
        position: fixed;
        font-size: 2vw;
        left: 40%;
        font-family: KaiTi;
        color: aliceblue;
        width: 7vw;
        height: 3vw;
        border: none;
        cursor: pointer;
    }

        .submit:hover {
            background-color: rgb(77, 200, 77);
            box-shadow: 0 0 5px #000;
        }

    .search_search3 {
        top: 80%;
        position: fixed;
        font-size: 2vw;
        left: 55%;
        font-family: KaiTi;
        color: black;
        width: 7vw;
        height: 3vw;
        border: none;
        cursor: pointer;
    }

        .search_search3:hover {
            background-color: rgb(226, 226, 226);
            box-shadow: 0 0 5px #ffffff;
        }

    .header {
        position: fixed;
        top: 10%;
        left: 50%;
        font-size: 2.5vw;
        color: green;
        font-family: KaiTi;
        font-weight: bolder;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }

    .search {
        position: fixed;
        top: 20%;
        left: 32%;
    }

    .search_box {
        margin-left: 20px;
        position: fixed;
        top: 20%;
        left: 40%;
        font-size: 15px;
        font-family: KaiTi;
        width: 30vw;
        height: 40px;
    }

    .search_search {
        top: 20%;
        position: fixed;
        font-size: 2.3vw;
        left: 30%;
        font-family: KaiTi;
        color: black;
        width: 10vw;
        height: 4vw;
        border: none;
    }


    .search1 {
        position: fixed;
        top: 40%;
        left: 32%;
    }

    .search_box1 {
        margin-left: 20px;
        position: fixed;
        top: 40%;
        left: 40%;
        font-size: 15px;
        font-family: KaiTi;
        width: 30vw;
        height: 2.6vw;
    }

    .search_search1 {
        top: 40%;
        position: fixed;
        font-size: 2.3vw;
        left: 30%;
        font-family: KaiTi;
        color: black;
        width: 10vw;
        height: 4vw;
        border: none;
    }

    .search_search2 {
        top: 60%;
        position: fixed;
        font-size: 2.3vw;
        left: 30%;
        font-family: KaiTi;
        color: black;
        width: 10vw;
        height: 4vw;
        border: none;
        cursor: pointer;
    }

    .choose_major {
        margin-left: 20px;
        position: fixed;
        top: 60%;
        left: 40%;
        height: 5vh;
        font-size: 2.3vw;
        font-family: KaiTi;
        border: none;
    }

        .choose_major:hover {
            cursor: pointer;
        }
</style>