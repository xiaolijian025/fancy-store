<template>
    <div class="page">
        <van-nav-bar :title="$t('m.HeaderMember')" />

        <div class="container">
            <div class="floor floor_one" @click="toLogin">
                <!-- <img :src="$store.state.user.avatar" alt>
        <p>{{$store.state.user.user}}</p>-->
            </div>
            <van-cell class="member_item" title="个人信息" is-link to="info" />
            <van-cell class="member_item" title="我的订单" is-link to="order" />
            <van-cell class="member_item" title="我的地址" is-link to="address" />
            <van-cell class="member_item" title="设置" is-link to="set" />
            <!-- <div class="floor floor_item floor_two flex-space" @click="onInfo">
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
      </div>-->
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["this.$store.state.user"])
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
    text-align: center;
    img {
        // position: absolute;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-top: 30px;
    }
    p {
        // position: absolute;
        // bottom: 25%;
        // left: 0;
        // right: 0;
        // margin: 0 auto;
        // text-align: center;
        color: white;
        margin-top: 20px;
        font-size: 18px;
    }
}
.member_item {
    margin-bottom: 10px;
}
</style>
