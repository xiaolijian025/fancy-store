<template>
    <div class="page orderpage container">
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onBack" />

        <van-tabs v-model="active" swipeable @click="onBar">
            <van-tab :title="item.name" v-for="(item, index) in orderTab" :key="index">
                <div class="order_item" v-for="(itemPay, itemIndex) in orderData" :key="itemIndex">
                    <div class="order-top flex-space">
                        <p>订单号:{{ itemPay.id }}</p>
                        <el-tag>{{ itemPay.status }}</el-tag>
                    </div>
                    <div class="order-content flex">
                        <div class="flex" v-for="(itemProduct, indexProduct) in itemPay.product" :key="indexProduct">
                            <img class="order-img" :src="itemProduct.imgCover" />
                            <div class="order-text">
                                <p class="goods-price">¥{{ itemProduct.priceNow }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <!-- <el-tabs>
            <el-tab-pane :label="item.name" v-for="(item, index) in orderTab" :key="index" @tab-click="onBar">
                <div class="order_item" v-for="(itemPay, itemIndex) in orderData" :key="itemIndex">
                    <div class="order-top flex-space">
                        <p>订单号:{{ itemPay.id }}</p>
                        <el-tag>{{ itemPay.status }}</el-tag>
                    </div>
                    <div class="order-content flex">
                        <div class="flex" v-for="(itemProduct, indexProduct) in itemPay.product" :key="indexProduct">
                            <img class="order-img" :src="itemProduct.imgCover" />
                            <div class="order-text">
                                <p class="goods-price">¥{{ itemProduct.priceNow }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
    </el-tabs>-->
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetOrder } from "../../api/order.js";
export default {
    data() {
        return {
            havePage: false,
            orderData: [],
            type: "",
            orderTab: [{ name: "全部" }, { name: "待付款" }, { name: "待收货" }, { name: "已完成" }]
        };
    },
    components: {
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        ...mapGetters(["this.$store.state.pays", "this.$store.state.ordercur", "this.$store.state.ordertab"])
    },
    mounted() {
        this.getOrder();
    },
    methods: {
        async getOrder() {
            let res = await apiGetOrder(this.type);
            this.orderData = res.data.result;
            console.error("resorder", res);
        },
        onBar(index, title) {
            this.type = title;
            this.getOrder();
        },
        onSwipeLeft() {
            this.$router.push("./waitpay");
        },
        onSwipeRight() {
            this.$router.push("./orderdown");
        },
        ...mapMutations({
            setOrdercur: "SET_ORDERCUR",
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";

.order_item {
    border-bottom: 1px solid #ccc;
    height: 120px;
    padding-top: 10px;
}

.order-top {
    font-size: 14px;
    line-height: 20px;
    padding: 0 10px;
}
.order-img {
    width: 60px;
    height: 60px;
}
</style>
