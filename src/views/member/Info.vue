<template>
    <div class="page">
        <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onBack" />

        <div class="container" v-show="mainarea">
            <img src="../../../public/img/github.png" alt />
            <p>wechat:374139613</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    mounted() {}
};
</script>

<style lang="less" scoped>
.container {
    text-align: center;
    img {
        margin-top: 30px;
    }
    p {
        margin-top: 30px;
        font-size: 28px;
    }
}
</style>
