<template>
    <div class="page orderpage container">
        <van-nav-bar title="我的订单" left-arrow @click-left="onBack" />

        <van-tabs v-model="active" swipeable animated @click="onBar" @change="onBar">
            <van-tab :title="item.name" v-for="(item, index) in orderTab" :key="index">
                <div class="order_item" v-for="(itemPay, itemIndex) in orderData" :key="itemIndex">
                    <div class="order-top flex-space">
                        <p>订单号:{{ itemPay._id }}</p>
                        <van-tag :type="itemPay.color">{{ itemPay.status | statusFilter }}</van-tag>
                    </div>
                    <div class="order-content flex">
                        <div class="flex" v-for="(itemProduct, indexProduct) in itemPay.products" :key="indexProduct"><img class="order-img" :src="itemProduct.imgCover" /></div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetOrder } from "../../api/order.js";
import { filter } from "minimatch";
import { Tag } from "vant";
export default {
    filters: {
        statusFilter: function(status) {
            switch (status) {
                case "payed":
                    return "已支付";
                    break;
                case "paying":
                    return "待付款";
                    break;
                case "done":
                    return "已完成";
                    break;
            }
        }
    },
    data() {
        return {
            havePage: false,
            orderData: [],
            type: "paying",
            orderTab: [{ name: "待付款" }, { name: "待收货" }, { name: "已完成" }, { name: "全部" }]
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
            this.orderData = res.data.result.map(item => {
                if (item.status == "payed") {
                    item.color = "success";
                } else if (item.status == "paying") {
                    item.color = "danger";
                } else if (item.status == "done") {
                    item.color = "";
                }
                return item;
            });
            console.error("resorder", res);
        },
        onBar(index, title) {
            console.log("title", title);
            switch (title) {
                case "待付款":
                    this.type = "paying";
                    break;
                case "待收货":
                    this.type = "payed";
                    break;
                case "已完成":
                    this.type = "done";
                    break;
                case "全部":
                    this.type = "";
                    break;
            }
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
    background: white;
}

.order-top {
    font-size: 14px;
    line-height: 20px;
    padding: 0 10px;
}
.order-img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
}
</style>
