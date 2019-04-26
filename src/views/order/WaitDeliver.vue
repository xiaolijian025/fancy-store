<template>
    <div class="page orderpage">
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onBack" />

        <div class="ordercontainer" v-show="mainarea">
            <img src="../../../public/img/github.png" alt />
            <p>待发货页面</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapGetters(["this.$store.state.ordercur"])
    },
    mounted() {
        this.$refs.noback.isBack = false;
        this.setOrdercur(3);
        this.$store.state.ordercur < this.$store.state.ordertab ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setOrdertab(3);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./waitreceive");
        },
        onSwipeRight() {
            this.$router.push("./waitpay");
        },
        ...mapMutations({
            setOrdercur: "SET_ORDERCUR",
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>
