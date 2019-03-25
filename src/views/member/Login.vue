<template>
    <div class="page">
        <headersec tabname="登录"></headersec>
        <div class="login">
            <input type="text" placeholder="输入账号" v-model="userAccount" /> <input type="text" placeholder="输入密码" v-model="userPasswd" />
            <div class="login_btn" @click="onLogin">登录</div>
        </div>
    </div>
</template>

<script>
import { apiLogin } from "../../api/user.js";
export default {
    data() {
        return {
            userAccount: "111",
            userPasswd: "111"
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec")
    },
    mounted() {
        console.log(`1`);
    },
    methods: {
        async onLogin() {
            let res = await apiLogin(this.userAccount, this.userPasswd);
            console.log("res", res);
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    margin-top: 88px;
    input {
        display: block;
        margin-bottom: 20px;
    }
}
.login_btn {
    width: 40px;
    height: 40px;
}
</style>
