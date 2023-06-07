<<<<<<< HEAD
<!--
 * @FileDescription: 登录页面
 * @Author: 轩广哲
-->
<template>
    <div class="page-container">
        <img src="../assets/bit_logo.png">
        <h1 id="Motto">德以明理，学以精工</h1>
        <div class="login-register-wrapper">
            <div class="Name">试题分享平台</div>
            <!-- 在父组件模板中使用 component 标签作为占位符，并绑定 is 属性到 currentComponent 变量 -->
            <component :is="currentComponent" @replace-component="replaceComponent">
            </component>
        </div>
    </div>
</template>
<script>
    import RegisterForm from '../components/RegisterForm.vue';
    import LoginForm from '../components/LoginForm.vue';

    export default {
        name: 'LoginView',
        components: { RegisterForm, LoginForm }, // 声明子组件
        data() {
            return {
                currentComponent: 'LoginForm' // 初始化子组件为当前组件 (假设是login组件)
            };
        },
        methods: {
            replaceComponent(newComponentName) {
                // 监听自定义事件，接收新组件的名称，并动态更新 currentComponent 变量
                this.currentComponent = newComponentName;
            }
        }
    }
</script>
<style>
    #Motto {
        font-family: KaiTi, sans-serif;
        color: #429466;
        font-size: 64px;
        font-weight: bold; /* 加粗*/
        position: absolute;
        bottom: auto;
        left: 20px;
    }

    .page-container {
        background-image: url('../assets/login_background.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 100vh;
    }

    .login-register-wrapper {
        box-sizing: border-box;
        position: absolute;
        top: 40%;
        right: 10%;
    }

    .Name {
        box-sizing: border-box;
        width: 30%;
        min-width: 300px;
        padding: 20px;
        border: solid 1px #ccc;
        border-radius: 10px;
        box-shadow: inset 0 0 10px #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "楷体", KaiTi,serif; /* 设置字体为楷体 */
        color: white; /* 设置颜色为白色 */
        font-size: 32px; /* 设置字体大小为 48 像素 */
        background-color: #429466;
    }
</style>
=======
<template>
    <div class="page-container">
        <img src="../assets/bit_logo.png">
        <h1 id="Motto">德以明理，学以精工</h1>
        <div class="login-register-wrapper">
            <div class="Name">试题分享平台</div>
            <!-- 在父组件模板中使用 component 标签作为占位符，并绑定 is 属性到 currentComponent 变量 -->
            <component :is="currentComponent" @replace-component="replaceComponent">
            </component>
        </div>
    </div>
</template>
<script>
import RegisterForm from '../components/RegisterForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'LoginView',
    components: { RegisterForm,LoginForm }, // 声明子组件
    data() {
        return {
            currentComponent: 'LoginForm' // 初始化子组件为当前组件 (假设是login组件)
        };
    },
    methods: {
        replaceComponent(newComponentName) {
            // 监听自定义事件，接收新组件的名称，并动态更新 currentComponent 变量
            this.currentComponent = newComponentName;
        }
    }
}
</script>
<style>
#Motto {
  font-family: KaiTi, sans-serif; 
  color: #429466;
  font-size: 64px; 
  font-weight: bold; /* 加粗*/
  position: absolute;
  bottom:auto;
  left: 20px;
}
.page-container {
    background-image: url('../assets/login_background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 100vh;
}

.login-register-wrapper {
    box-sizing: border-box;
    position: absolute;
    top:40%;
    right:10%;
}
.Name {
    box-sizing: border-box;
    width: 30%;
    min-width: 300px;
    padding: 20px;
    border: solid 1px #ccc;
    border-radius: 10px;
    box-shadow: inset 0 0 10px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "楷体", KaiTi,serif; /* 设置字体为楷体 */
    color: white; /* 设置颜色为白色 */
    font-size: 32px; /* 设置字体大小为 48 像素 */
    background-color: #429466;
}
</style>

>>>>>>> beda06369169a4ed3b730f5d2ddc61632d559ecc
