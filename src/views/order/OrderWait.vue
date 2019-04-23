<template>
    <div class="page">
        <headersec tabname="订单详情"></headersec>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div v-show="!havePage"><nopage></nopage></div>
                <div v-show="havePage">
                    <div class="chooseAddress" @click="onAddress()">
                        <div class="flex chooseBox">
                            <i class="el-icon-location-outline"></i>
                            <div class="flex flex-space">
                                <p v-show="!this.$store.state.chooseaddress">选择送货地址</p>
                                <!-- <p
                  v-show="this.$store.state.chooseaddress"
                >{{ this.$store.state.chooseaddress.address }}</p>-->
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="orderItem flex" v-for="(orderItem, orderIndex) in $store.state.orders" :key="orderIndex">
                        <img :src="orderItem.imgCover" class="goodsImg" />
                        <div>
                            <p class="goods-name">{{ orderItem.title }}</p>
                            <p class="goods-num">x{{ orderItem.num }}</p>
                            <p class="goods-price">¥{{ orderItem.priceNow }}</p>
                        </div>
                    </div>
                    <div class="orderBottom flex-space">
                        <span>总金额:{{ allCoach }}</span> <span @click="onOrder">结算</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiAddOrder } from "../../api/order.js";
export default {
    data() {
        return {
            allCoach: 0,
            havePage: false,
            slidename: "slide-go",
            prodectId: []
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        ...mapGetters(["this.$store.state.orders", "this.$store.state.chooseaddress"])
    },
    mounted() {
        this.$store.state.orders === undefined ? (this.havePage = false) : (this.havePage = true);

        this.$store.state.orders.forEach(item => {
            //   sums.push(item.priceNow);
            this.allCoach += item.priceNow * item.num;
            console.log("item._id: ", typeof item._id);
            this.prodectId.push(item._id);
        });
        /*判断动画是进还是出*/
        const slideArr = ["goodsdetail", "cart"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-go") : (this.slidename = "slide-back");
        this.setComname("orderwait");
    },

    methods: {
        /*我的订单*/
        onOrder() {
            this.$confirm("是否现在结算该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "稍后",
                type: "warning"
            })
                .then(() => {
                    this.addOrder("已付款");
                })
                .catch(() => {
                    this.addOrder("待付款");
                });
        },
        async addOrder(status) {
            console.log("this.prodectId", Array.isArray(this.prodectId));
            console.log("this.prodectId: ", this.prodectId);
            let res = await apiAddOrder(this.prodectId, this.$store.state.chooseaddress, this.allCoach, status);
            if ((status = "已付款")) {
                this.$message({
                    type: "success",
                    message: "下单成功"
                });
                setTimeout(() => {
                    this.$router.push({
                        path: "/order"
                    });
                }, 1000);
            } else {
                this.$router.push({
                    path: "/order"
                });
            }
            this.setPays(this.$store.state.orders);
        },
        /*选择地址*/
        onAddress() {
            this.setIschoose(1);
            this.$router.push("./address");
        },
        ...mapMutations({
            setPays: "SET_PAYS",
            setIschoose: "SET_ISCHOOSE"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.chooseBox {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 50px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px dashed @theme_background;
    img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    div {
        width: 100%;
    }
    p {
        text-align: center;
    }
}

.orderItem {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.goodsImg {
    width: 100px;
    height: 100px;
}

.orderBottom {
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    color: @base_color;
    font-size: 14px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
}

.arrow_next {
    width: 60px;
    height: 40px;
    background: url("../../../public/img/icon/common_sprites.png") 0px -313px; /* no */
    background-size: 100%;
}
.address_img {
    width: 60px;
    height: 48px;
    background: url("../../../public/img/icon/common_sprites.png") 0px -203px; /* no */
    background-size: 100%;
}
</style>
