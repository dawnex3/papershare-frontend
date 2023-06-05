<!--
 * @FileDescription: 管理专业
 * @Author: 刘江浩
-->
<template>
    <div class="page">
        <el-container>
            <el-main>
                <div class="p1">
                    <p>管理专业信息</p>
                </div>
                <div class="inputMajor">
                    <el-input class="inMajor" v-model="major" placeholder="请输入要添加的专业" clearable />
                    <el-input class="inDescription" v-model="description" placeholder="请输入描述信息" clearable />
                    <el-button class="inbut" type="success" round @click="addMajor()"> 添加 </el-button>
                </div>
                <div class="box">
                    <div class="file" v-if="majors">
                        <el-table :data="majors.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                  style="width: 100%">
                            <el-table-column prop="name" label="专业名称" width="190" :resizable="false">
                            </el-table-column>
                            <el-table-column prop="describe" label="介绍" width="320" :resizable="false">
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="80" :resizable="false" :filters="[
                                { text: '正常', value: 0 },
                                { text: '已停用', value: 1 },
                            ]" :filter-method="filterTag" filter-placement="bottom">
                                <template #default="scope">
                                    <el-tag :type="scope.row.status === '0' ? 'success' : 'warning'" disable-transitions>
                                        {{ getType(scope.row) }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column align="right">
                                <template #header>
                                    <el-input v-model="search" size="small" placeholder="根据名称查找" />
                                </template>
                                <template #default="scope">
                                    <el-button size="small" type="danger"
                                               @click="deleteMajor(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <el-empty v-else description="空空如也" class="empty" />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    export default {
        name: 'MajorManage',
        components: {
        },
        data() {
            return {
                majors: [],
                major: '',
                description: '',
                userData: {},

                search: '',
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('UserData'))
            this.getMajor();
        },
        methods: {
            //用来获取专业信息，只需要改变接口就可以
            getMajor() {
                this.$axios.get('/subjects', {
                    params: {
                    }
                })
                    .then((response) => {
                        console.log(response);
                        this.majors = response.data.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            },
            //用来删除专业
            deleteMajor(row) {
                this.$confirm('此操作将删除该专业, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //这里需要改
                    this.$axios.delete('http://127.0.0.1:4523/m1/2678340-0-default/api/papers/{paper_id}', {
                        paper_id: row.paper_id,
                    }).then((res) => {
                        console.log('删除成功');
                        this.getMajor();
                        console.log(res);
                    }).catch((error) => {
                        console.log('删除失败');
                        console.error(error);
                    })
                    //
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加专业
            addMajor() {
                if (this.major && this.description) {
                    this.$axios.get('http://127.0.0.1:4523/m1/2678340-0-default/api/subjects?apifoxResponseId=216158862', {
                        params: {
                            name: this.major,
                            describe: this.description
                        }
                    })
                        .then((response) => {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            console.log(response);
                            this.majors = response.data.data;
                        })
                        .catch((error) => {
                            console.error(error);
                            this.$message({
                                type: 'error',
                                message: '添加失败'
                            });
                        })
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: '请输入专业名和相应描述信息'
                    });
                }
            },
            filterTag(value, row) {
                return row.type === value;
            },
            getType(row) {
                if (row.type == 1) {
                    return "已停用"
                }
                else if (row.type == 0) {
                    return "正常"
                } else {
                    return "其他"
                }
            },
        }

    }
</script>

<style scoped>
    .page {
        display: flex;
        float: right;
        position: fixed;
        width: 100%;
        height: 100%;
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

    .p1 {
        color: #06A47B;
        padding-left: 160px;
        margin-top: 50px;
    }

    .inputMajor {
        padding-left: 160px;
    }

    .inMajor {
        width: 300px;
    }

    .inDescription {
        margin-left: 20px;
        width: 300px;
    }

    .inbut {
        margin-left: 20px;
        width: 80px;
    }

    .box {
        /* border-style:solid; */
        display: flex;
        justify-content: center;
        border: #06A47B, 2px;
        box-shadow: var(--el-box-shadow-light);
        height: 500px;
        width: 900px;
        margin-top: 20px;
        margin-left: 160px;
    }

    .file {
        /* border-style:solid; */
        width: inherit;
        height: inherit;
    }

    .empty {
        align-items: center;
    }
</style>