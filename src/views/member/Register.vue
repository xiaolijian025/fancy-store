<template>
    <div class="page">
        <headersec tabname="注册"></headersec>
        <div class="register">
            <el-form label-position="left" label-width="80px">
                <el-form-item label="用户名:"> <el-input size="mini" placeholder="输入账号" clearable v-model="userAccount"></el-input> </el-form-item>
                <el-form-item label="密码:"> <el-input size="mini" placeholder="输入密码" type="password" clearable v-model="userPasswd"></el-input> </el-form-item>
                <el-form-item label="确认密码:"> <el-input size="mini" placeholder="输入确认密码" type="password" clearable v-model="userPasswdConfim"></el-input> </el-form-item>
            </el-form>
            <el-button class="login_btn" type="primary" @click="onRegister" size="mini">注册</el-button>
        </div>
        <div class="login" @click="toLogin">已有账号？前往登录...</div>
    </div>
</template>

<script>
import { apiRegister } from "../../api/user.js";
export default {
    data() {
        return {
            userAccount: "123",
            userPasswd: "abc",
            userPasswdConfim: "abc"
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec")
    },
    mounted() {
        console.log(`1`);
    },
    methods: {
        async onRegister() {
            let res = await apiRegister(this.userAccount, this.userPasswd);
            if (res.data.code == 0) {
                this.$router.push({
                    path: "/login"
                });
            } else {
                this.$toastBox.showToastBox({
                    toast: res.data.msg
                });
            }
            console.log("res", res);
        },
        toLogin() {
            this.$router.push({
                path: "/login"
            });
        }
    }
};
</script>

<style lang="less" scoped>
.register {
    text-align: center;
    margin: 0 auto;
    margin-top: 94px;
}
.login_btn {
    margin: 20px;
    width: 100px;
}
.login {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #ccc;
    font-size: 12px;
    text-align: center;
}
</style>
