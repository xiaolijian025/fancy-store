<template>
    <div class="page">
        <van-nav-bar title="登录" left-arrow @click-left="onBack" />

        <div class="login">
            <van-cell-group>
                <van-field v-model="userAccount" required clearable left-icon="contact" label="用户名" placeholder="请输入用户名" />

                <van-field v-model="userPasswd" left-icon="closed-eye" type="password" label="密码" placeholder="请输入密码" required />
            </van-cell-group>
            <van-button class="login_btn" size="small" round type="info" @click="onLogin">登录</van-button>
        </div>
        <div class="register" @click="toRegister">还没有账号？进行注册...</div>
    </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters, mapMutations } from "vuex";
import { apiLogin } from "../../api/user.js";
export default {
    data() {
        return {
            userAccount: "123",
            userPasswd: "abc"
        };
    },
    components: {},
    mounted() {
        console.log(`1`);
    },
    methods: {
        async onLogin() {
            let res = await apiLogin(this.userAccount, this.userPasswd);
            if (res.data.code == 0) {
                // this.setCarts(res.data.result.carts.length);
                this.$router.push({
                    path: "/"
                });
            } else {
                Toast({
                    message: res.data.msg,
                    position: "bottom"
                });
            }
            console.log("res", res);
        },
        toRegister() {
            this.$router.push({
                path: "/register"
            });
        },
        ...mapMutations({
            setCarts: "SET_CARTS"
        })
    }
};
</script>

<style lang="less" scoped>
.page {
    background: #f2f3f5;
}
.login {
    text-align: center;
    margin-top: 94px;
    margin-left: 10px;
    margin-right: 10px;
}
.login_btn {
    margin: 20px;
    width: 100px;
}
.register {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #ccc;
    font-size: 12px;
    text-align: center;
}
</style>
