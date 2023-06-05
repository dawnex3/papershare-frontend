<!--
 * @FileDescription: 个人上传试题界面。
 * @Author: 刘江浩
-->
<template>
    <div class="page">
        <el-container>
            <el-main>
                <div class="p1">
                    <p>个人上传试题/题解</p>
                </div>

                <div class="box">
                    <div class="file" v-if="files">
                        <el-table :data="files.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                  style="width: 100%">
                            <el-table-column prop="name" label="名称" width="180" :resizable="false">
                            </el-table-column>
                            <el-table-column prop="time" label="时间" width="180" :resizable="false">
                            </el-table-column>
                            <el-table-column prop="type" label="类型" width="100" :resizable="false" :filters="[
                                { text: '试卷', value: 0 },
                                { text: '答案', value: 1 },
                            ]" :filter-method="filterTag" filter-placement="bottom">
                                <template #default="scope">
                                    <el-tag :type="scope.row.type === '1' ? 'primary' : 'success'" disable-transitions>
                                        {{
                                        getType(scope.row)
                                        }}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column align="right">
                                <template #header>
                                    <el-input v-model="search" size="small" placeholder="根据名称查找" />
                                </template>
                                <template #default="scope">
                                    <el-button size="small" @click="gotoFiles(scope.row)">查看</el-button>
                                    <el-button size="small" type="danger"
                                               @click="deleteFile(scope.row)">删除</el-button>
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
        name: 'UserFollow',
        components: {
        },
        data() {
            return {
                files: [],

                userData: {},

                search: '',
            }
        },
        created() {
            this.userData = JSON.parse(localStorage.getItem('UserData'))
            this.getFiles();
        },
        methods: {
            getFiles() {
                this.$axios.get('files', {
                    params: {
                        uploader: this.userData.id
                    }
                })
                    .then((response) => {
                        console.log(response);
                        this.files = response.data.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            },
            gotoFiles(row) {
                // console.log(row.paper_id);
                this.$router.push('/paper/' + row.paper_id);
            },
            filterTag(value, row) {
                return row.type === value;
            },
            getType(row) {
                if (row.type == 0) {
                    return "试卷"
                }
                else if (row.type == 1) {
                    return "答案"
                } else {
                    return "其他"
                }
            },
            deleteFile(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('files/' + row.paper_id, {})
                        .then((res) => {
                            this.getFiles();
                            console.log(res);
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                        })
                        .catch((error) => {
                            console.error(error);
                            this.$message({
                                type: 'fail',
                                message: '删除失败'
                            })
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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

    .box {
        /* border-style:solid; */
        display: flex;
        justify-content: center;
        border: #06A47B, 2px;
        box-shadow: var(--el-box-shadow-light);
        height: 500px;
        width: 900px;
        margin-top: 40px;
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