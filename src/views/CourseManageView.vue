<!--
 * @FileDescription: 管理员添加课程页面
 * @Author: 轩广哲
-->
<template>
    <div class="page">
        <el-card class="box-card">
            <p1 class="courseInfo">添加课程信息</p1>
            <div class="courseAu">
                <CourseAudit />
            </div>
        </el-card>
    </div>
</template>

<script>
    import CourseAudit from '../components/CourseAudit.vue';

    export default {
        name: 'AdminView',
        components: { CourseAudit },
    }
</script>

<style scoped>
    .title {
        font-family: KaiTi, sans-serif;
        color: #429466;
        font-size: 48px;
        font-weight: bold; /* 加粗*/
        position: fixed;
        bottom: auto;
        left: 50%;
    }

    .page {
        height: auto;
        width: auto;
    }

    .box-card {
        display: flex;
        justify-content: center;
        align-items: center;
        border: #06A47B, 2px;
        box-shadow: var(--el-box-shadow-light);
        height: 600px;
        width: 1100px;
        margin-top: 65px;
        margin-left: 115px;
    }

    .courseInfo {
        position: fixed;
        left: 25%;
        top: 20%;
        font-weight: bold;
    }
</style>