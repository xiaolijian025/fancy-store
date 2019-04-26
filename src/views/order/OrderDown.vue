<template>
    <div class="page orderpage">
        <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
            <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onBack" />

            <transition :name="slidename">
                <div class="ordercontainer" v-show="mainarea">
                    <img src="../../../public/img/github.png" alt />
                    <p>已完成页面</p>
                </div>
            </transition>
        </v-touch>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            slidename: "slide-go"
        };
    },
    components: {},
    mounted() {
        this.$refs.noback.isBack = false;
        this.setOrdertab(5);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./order");
        },
        onSwipeRight() {
            this.$router.push("./waitreceive");
        },
        ...mapMutations({
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>
