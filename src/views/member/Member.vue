<template>
    <div class="page">
        <van-nav-bar :title="$t('m.HeaderMember')" />

        <div class="container">
            <div class="floor floor_one" @click="toLogin">
                <img src="../../../public/img/github.png" alt />
                <p>Open Free Share</p>
            </div>
            <div class="floor floor_item floor_two flex-space" @click="onInfo">
                <p>{{ $t("m.member.info") }}</p>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="floor floor_item floor_two flex-space" @click="onOrder">
                <p>{{ $t("m.member.order") }}</p>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="floor floor_item floor_two flex-space" @click="onAddress">
                <p>{{ $t("m.member.address") }}</p>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    mounted() {},
    methods: {
        /*个人信息*/
        onInfo() {
            this.$router.push("./info");
        },
        /*我的订单*/
        onOrder() {
            this.$router.push("./order");
        },
        /*我的地址*/
        onAddress() {
            this.$router.push("./address");
        },
        toLogin() {
            this.$router.push("./login");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.page {
    background: rgb(245, 245, 245);
}

.floor_one {
    width: 100%;
    height: 200px;
    background: @theme_background;
    position: relative;
    img {
        position: absolute;
        width: 9px;
        height: 45px;
        left: 0;
        right: 0;
        top: 15%;
        margin: auto;
    }
    p {
        position: absolute;
        bottom: 25%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        color: white;
        font-size: 13px;
    }
}

.floor_item {
    padding: 0 10px;
    line-height: 40px;
    font-size: 14px;
    background: @base_color;
    margin-bottom: 20px;
}
</style>
