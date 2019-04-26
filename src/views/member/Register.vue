<template>
    <div class="page">
        <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onBack" />
        <div class="register">
            <van-cell-group>
                <van-field v-model="userAccount" required clearable left-icon="contact" label="用户名" placeholder="请输入用户名" />

                <van-field v-model="userPasswd" left-icon="closed-eye" type="password" label="密码" placeholder="请输入密码" required />
                <van-field v-model="userPasswdConfim" left-icon="closed-eye" type="password" label="确认密码" placeholder="输入确认密码" required />
            </van-cell-group>
            <van-button class="login_btn" size="small" round type="info" @click="onRegister">注册</van-button>
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
    components: {},
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
