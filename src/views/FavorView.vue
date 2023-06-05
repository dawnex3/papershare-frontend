<!--
 * @FileDescription: 已收藏的试题页面。
 * @Author: 刘江浩
-->
<template>
    <!--
    <div class="page">
        <el-container>
            <el-main>
                <div class="p1">
                    <p>个人收藏试题</p>
                </div>

                <div class="box">
                    <div class="paper" v-if="papers">
                        <el-table :data="papers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                                  style="width: 100%">
                            <el-table-column prop="name" label="名称" width="180" :resizable="false">
                            </el-table-column>
                            <el-table-column prop="year" label="年份" width="180" :resizable="false">
                            </el-table-column>
                            <el-table-column align="right">
                                <template #header>
                                    <el-input v-model="search" size="small" placeholder="根据名称查找" />
                                </template>
                                <template #default="scope">
                                    <el-button size="small" @click="gotoPapers(scope.row)">查看</el-button>
                                    <el-button size="small" type="danger" @click="deletePaper(scope.row)">取消收藏</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <el-empty v-else description="空空如也" class="empty" />
                </div>
            </el-main>
        </el-container>
    </div>
    -->
    <el-container>
        <PaperWin class="paperWin" :message="papers" />
    </el-container>
</template>

<script>
    import PaperWin from "../components/PaperWin.vue";
export default {
    name: 'FavorView',
    components: {
        PaperWin
    },
    data() {
        return {
            papers: [],
            user_id:0,
            search:'',
        }
    },
    created() {
        this.getPapers();
    },
    methods: {
        getPapers() {
            console.log('test')
            this.user_id = JSON.parse(localStorage.getItem('UserData')).id
            this.$axios.get('papers', {
                params: {
                    favor_by: this.user_id
                }
            })
                .then((response) => {

                    this.papers = response.data.data
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        gotoPapers(row) {
            // console.log(row.paper_id);
            this.$router.push('/paper/' + row.paper_id);
        },
        deletePaper(row){
            this.$confirm('此操作将取消收藏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$axios.delete('http://127.0.0.1:4523/m1/2678340-0-default/api/users/1/favorites/{paper_id}',{
                    paper_id: row.paper_id,
                    user_id: this.id,
                }).then((res) => {
                    console.log('取消收藏成功');
                    this.getPapers();
                    console.log(res);
                }).catch((error) => {
                    console.log('取消收藏失败');
                    console.error(error);
                })
                this.$message({
                    type: 'success',
                    message: '取消收藏成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
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
        padding-left: 100px;
        margin-top: 50px;
    }

    .box {
        /* border-style:solid; */
        display: flex;
        justify-content: center;
        align-items: center;
        border: #06A47B, 2px;
        box-shadow: var(--el-box-shadow-light);
        height: 500px;
        width: 900px;
        margin-top: 50px;
        margin-left: 100px;
    }

    .paper {
        /* border-style:solid; */
        width: inherit;
        height: inherit;
    }

    .empty {
        align-items: center;
    }
</style>