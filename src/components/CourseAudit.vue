<!--
 * @FileDescription: 管理员待审核课程的列表页面的课程组件。
 * @Author: 轩广哲
-->
<template>

    <div class="container">
        <div class="bubble">
            <el-badge :value="this.courseData.length" class="item"> <el-button type="danger" text>待审核</el-button> </el-badge>
        </div>
        <el-table :data="courseData" height="500" v-if="courseData">
            <el-table-column prop="course" label="课程名称" width="200"></el-table-column>
            <el-table-column prop="userId" label="请求者学号" width="300"></el-table-column>
            <el-table-column prop="date" label="请求时间" width="300"></el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="scope">
                    <el-button type="primary" @click="approve(scope.$index)" class="btn">通过</el-button>
                    <el-button type="danger" @click="disapprove(scope.$index)" class="btn">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-empty v-else class="empty" description="空空如也"></el-empty>
    </div>
</template>
<script>
    import { ElTable, ElButton } from 'element-plus';
    export default {
        name: 'CourseAudit',
        components: {
            ElTable,
            ElButton,
        },
        data() {
            return {
                //暂时的假数据
                courseData: [
                    {
                        course: '课程1',
                        userId: '1120207890',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程2',
                        userId: '1120207891',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程3',
                        userId: '1120207892',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程4',
                        userId: '1120207893',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程5',
                        userId: '1120207894',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程6',
                        userId: '1120207895',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程7',
                        userId: '1120207896',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程4',
                        userId: '1120207897',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程5',
                        userId: '1120207898',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程6',
                        userId: '1120207899',
                        date: '2023-05-03'
                    },
                    {
                        course: '课程7',
                        userId: '1120207890',
                        date: '2023-05-03'
                    }
                ]
            }
        },
        methods: {
            approve(index) {
                this.$confirm(`您确定要通过该同学增加课程的申请吗？`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击了确认按钮，执行删除操作
                    this.courseData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '审核通过成功！'
                    });
                }).catch(() => {
                    // 点击了取消按钮，不用做任何事情
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });
                });
            },
            disapprove(index) {
                this.$confirm(`您确定要拒绝该同学增加课程的申请吗？`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击了确认按钮，执行删除操作
                    this.courseData.splice(index, 1);
                    this.$message({
                        type: 'warning',
                        message: '审核已驳回！'
                    });
                }).catch(() => {
                    // 点击了取消按钮，不用做任何事情
                    this.$message({
                        type: 'info',
                        message: '已取消！'
                    });
                });
            }
        }
    }
</script>
<style scoped>
    .container {
        position: fixed;
        left: 25%;
        top: 23%;
        /* display: flex; */
        flex-wrap: wrap;
        overflow: auto;
    }

    .btn {
        background-color: #429466;
        /* 设置背景颜色为绿色 */
        border-color: #429466;
        /* 设置边框颜色为绿色 */
        color: white;
        /* 设置文字颜色为白色 */
        width: 45%;
    }

    .empty {
        align-items: center;
        margin-top: 60px;
        margin-left: 400px;
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>