<template>
    <div class="page">
        <headers :tabname="$t('m.HeaderCart')"></headers>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div v-show="!havePage"><nopage></nopage></div>
                <div v-show="havePage">
                    <div class="cart-item" :class="{ selected: itemIndex === cartIndex }" v-for="(cartItem, cartIndex) in cartsData" :key="cartIndex" @click="onDetail(cartItem)">
                        <v-touch @swipeleft="onSwipeLeft(cartIndex)" @swiperight="onSwipeRight(cartIndex)">
                            <div class="cart-content flex">
                                <div class="goods-radio" @click.stop="onGoodsRadio(cartItem)">
                                    <i class="cart_radio" v-show="!cartItem.goodsRadio"></i> <i class="cart_radio_select" v-show="cartItem.goodsRadio"></i>
                                </div>
                                <div class="flex">
                                    <div class="goods-img"><img v-lazy="cartItem.imgCover" /></div>
                                    <div class="goods-textBox">
                                        <p class="goods-name">{{ cartItem.title }}</p>
                                        <div class="goodsOp flex">
                                            <i class="shop_cut" @click.stop="onCutCart(cartItem)"></i> <input type="text" :value="cartItem.num" />
                                            <i class="shop_add" @click.stop="onAddCart(cartItem)"></i>
                                        </div>
                                        <p class="goods-coach">¥{{ cartItem.priceNow }}</p>
                                    </div>
                                </div>
                            </div>
                            <!--v-show="itemIndex === cartIndex"-->
                            <div class="remove" @click.stop="onRemove(cartItem, cartIndex)"><i></i></div>
                        </v-touch>
                    </div>
                </div>
            </div>
        </transition>

        <div class="cartBottom-detail flex-space" v-show="$store.state.carts" v-cloak>
            <div class="flex">
                <div class="shopRadio" @click="onSelectAll()"><i class="cart_radio" v-show="!goodsRadioAll"></i> <i class="cart_radio_select" v-show="goodsRadioAll"></i></div>
                <div class="bottom-left">
                    <p>
                        合计: <span class="shopCoach">¥{{ allCoach }}</span>
                    </p>
                </div>
            </div>

            <div class="subminCart" @click="onOrder"><p>提交订单</p></div>
        </div>
        <footers :urlRouter="$route.path"></footers>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetCart, apiDeleteCart, apiUpdateCart } from "../../api/cart.js";
export default {
    data() {
        return {
            goodsRadioAll: false,
            allCoach: 0,
            radioArr: [],
            havePage: false,
            itemIndex: "",
            cartsData: []
        };
    },
    components: {
        Headers: () => import("../../components/Header"),
        Footers: () => import("../../components/Footer"),
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        ...mapGetters(["this.$store.state.carts"])
    },
    mounted() {
        /*判断动画是进还是出*/
        const slideArr = ["index", "category", "goodsdetail"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-go") : (this.slidename = "slide-back");
        this.setComname("cart");

        this.getCart();
    },
    methods: {
        async getCart() {
            let res = await apiGetCart();
            console.log("res", res);
            this.cartsData = res.data.result;

            console.error("this.cartsData", this.cartsData);
            if (this.cartsData.length == 0) {
                this.havePage = false;
            } else {
                this.havePage = true;
                this.cartsData.forEach(item => {
                    typeof item.goodsRadio == "undefined" && this.$set(item, "goodsRadio", false);
                });
            }
            console.error("cart", this.cartsData);
        },
        /*选择单个商品*/
        onGoodsRadio(item) {
            this.radioArr = [];
            item.goodsRadio = !item.goodsRadio;
            this.cartsData.forEach(itemGoods => {
                this.radioArr.push(itemGoods.goodsRadio);
            });
            this.radioArr.indexOf(false) == -1 ? (this.goodsRadioAll = true) : (this.goodsRadioAll = false);
            this.onCalAllCoach();
        },
        /*选择全部商品*/
        onSelectAll() {
            this.goodsRadioAll = !this.goodsRadioAll;
            this.goodsRadioAll
                ? this.cartsData.forEach(item => {
                      item.goodsRadio = true;
                  })
                : this.cartsData.forEach(item => {
                      item.goodsRadio = false;
                  });
            this.onCalAllCoach();
        },
        /*添加商品数量*/
        async onAddCart(item) {
            let res = await apiUpdateCart(item._id, "add");
            item.num++;
            console.log("res", res);
            this.onCalAllCoach();
        },
        /*减少商品数量*/
        async onCutCart(item) {
            if (item.num > 1) {
                let res = await apiUpdateCart(item._id, "cut");
                item.num--;

                this.onCalAllCoach();
            }
        },
        /*计算价格*/
        onCalAllCoach() {
            this.allCoach = 0;
            this.cartsData.forEach(item => {
                item.goodsRadio && (this.allCoach += item.num * item.priceNow);
            });
        },
        /*删除商品*/
        async onRemove(item, index) {
            let res = await apiDeleteCart(item._id);
            console.log("res", res);
            this.cartsData.splice(index, 1);
            //   let index = this.$store.state.carts.indexOf(item);
            //   this.$store.state.carts.splice(index, 1);
            //   this.itemIndex = "";
        },
        /*提交订单*/
        onOrder() {
            let orderArr = [];
            this.$store.state.carts.forEach(item => {
                item.goodsRadio && orderArr.push(item);
            });

            if (orderArr.length) {
                this.$router.push("orderwait");
                this.setOrders(orderArr);
            }
        },
        /*向左滑出现删除*/
        onSwipeLeft(index) {
            this.itemIndex = index;
        },
        /*向右滑隐藏删除*/
        onSwipeRight() {
            this.itemIndex = "";
        },
        /*进入商品详情*/
        onDetail(item) {
            this.$router.push("/detail");
            this.setGoods(item);
        },
        ...mapMutations({
            setOrders: "SET_ORDERS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.container {
    padding-bottom: 160px;
    overflow-x: hidden;
}

.cart-item {
    border-bottom: 1px solid #cccccc;
    padding-top: 20px;
    height: 240px;
    -webkit-transition: all 0.3s linear;
    -webkit-user-select: none;
    position: relative;
}

.remove {
    background: linear-gradient(90deg, #9bbeff 0%, #6495ed 100%);
    width: 18%;
    height: 260px;
    line-height: 260px;
    text-align: center;
    text-decoration: none;
    position: absolute;
    right: -18%;
    top: 0;
    i {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 20%;
        width: 40px;
        height: 48px;
        background: url("../../../public/img/icon/common_sprites.png") -10px -438px;
    }
}

.cart-content {
    width: 100%;
}

.selected {
    -webkit-transform: translate(-12%, 0);
    -webkit-transition: all 0.3s linear;
}

.goods-radio {
    margin: 0 10px;

    i {
        width: 68px;
        height: 58px;
        display: inline-block;
        background-size: 100%;
    }
}
.cart_radio,
.cartBottom-detail {
    background: url("../../../public/img/icon/common_sprites.png") 0px -47px; /* no */
}
.cart_radio_select {
    background: url("../../../public/img/icon/common_sprites.png") 0px 6px; /* no */
}
.goods-img {
    margin-right: 20px;
    width: 200px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}

.goods-name {
    font-size: 28px;
}

.goods-coach {
    font-size: 30px;
    color: red;
    align-self: flex-end;
}

.goodsOp {
    margin: 40px 0;
    i {
        width: 66px;
        height: 55px;
    }
    input {
        border: none;
        font-size: 36px;
        text-align: center;
        width: 60px;
    }
    .shop_cut {
        background: url("../../../public/img/icon/common_sprites.png") 0px -554px;
        background-size: 100%;
    }
    .shop_add {
        background: url("../../../public/img/icon/common_sprites.png") 0px -620px;
        background-size: 100%;
    }
}

.cartBottom-detail {
    height: 80px;
    font-size: 28px;
    width: 100%;
    position: absolute;
    bottom: 80px;
    color: @base_color;
    background: @theme_background;
    /*background:red;*/
    i {
        width: 68px;
        height: 68px;
        display: inline-block;
        background-size: 100%;
    }
}

.subminCart {
    padding-right: 20px;
}
</style>
