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
            userAccount: "123",
            userPasswd: "abc"
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
            if (res.data.code == 0) {
                this.$router.push({
                    path: "/"
                });
            } else {
                this.$toastBox.showToastBox({
                    toast: res.data.msg
                });
            }
            console.log("res", res);
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    text-align: center;
    margin: 0 auto;
    margin-top: 268px;
    input {
        display: block;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        padding: 10px;
    }
}
.login_btn {
    width: 100px;
    line-height: 30px;
    border: 1px solid #ccc;
    padding: 10px;
    background: blue;
    color: white;
    text-align: center;
    margin: 0 auto;
    margin-top: 80px;
    font-size: 20px;
}
</style>
