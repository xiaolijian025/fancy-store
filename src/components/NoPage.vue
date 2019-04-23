<template>
    <div class="flex" v-show="havePage">
        <img src="../../public/img/github.png" />
        <p>{{ title }}</p>
        <router-link to="./login" class="to_login" v-if="toLogin"> <el-button type="primary" size="mini">去登陆</el-button> </router-link>
    </div>
</template>
<script>
export default {
    props: { title: String },
    data() {
        return {
            havePage: false,
            toLogin: false
        };
    },
    methods: {
        onDisplay() {
            this.havePage = true;
        },
        onHide() {
            this.havePage = false;
        },
        onLogin() {
            this.toLogin = true;
        }
    }
};
</script>
<style lang="less" scoped>
div {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

img {
    text-align: center;
    margin: 30px 0;
    width: 100px;
    height: 100px;
}

p {
    text-align: center;
}
.to_login {
    margin-top: 20px;
}
</style>
