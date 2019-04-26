<template>
    <div class="page">
        <van-nav-bar :title="$t('m.HeaderCart')" />
        <div class="container">
            <nopage ref="nopage" :title="title"></nopage>
            <div>
                <div class="cart-item flex-space" :class="{ selected: itemIndex === cartIndex }" v-for="(cartItem, cartIndex) in cartsData" :key="cartIndex">
                    <van-checkbox class="goods_check" v-model="cartItem.goodsRadio" @click.native="onGoodsRadio(cartItem)"></van-checkbox>
                    <div class="flex" @click="onDetail(cartItem)">
                        <img class="goods-img" v-lazy="cartItem.imgCover" />
                        <div class="goods-textBox">
                            <p class="goods-name">{{ cartItem.title }}</p>
                            <div class="goodsOp">
                                <i class="el-icon-remove-outline" @click.stop="onCutCart(cartItem)"></i>
                                <input type="text" :value="cartItem.num" />
                                <i class="s el-icon-circle-plus-outline" @click.stop="onAddCart(cartItem)"></i>
                            </div>
                            <p class="goods-coach">¥{{ cartItem.priceNow }}</p>
                        </div>
                    </div>
                    <i class="remove el-icon-delete" @click.stop="onRemove(cartItem, cartIndex)"></i>
                </div>
            </div>
        </div>

        <div class="cartBottom-detail flex-space" v-show="$store.state.carts" v-cloak>
            <!-- <van-submit-bar :price="allCoach" button-text="提交订单" @submit="onOrder">
        <van-checkbox v-model="goodsRadioAll" @click.native="onSelectAll()">全选</van-checkbox>
      </van-submit-bar>-->
            <div>
                <van-checkbox class="goods_check" v-model="goodsRadioAll" @click.native="onSelectAll()">
                    合计:
                    <span class="shopCoach">¥{{ allCoach }}</span>
                </van-checkbox>
                <!-- <el-checkbox v-model="goodsRadioAll" @click.native="onSelectAll()">
          
        </el-checkbox>-->
            </div>

            <div class="subminCart" @click="onOrder">提交订单</div>
            -->
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetCart, apiDeleteCart, apiUpdateCart } from "../../api/cart.js";
import { dataMixin } from "../../mixins/dataMixin.js";
export default {
    data() {
        return {
            goodsRadioAll: false,
            allCoach: 0,
            radioArr: [],
            itemIndex: "",
            cartsData: []
        };
    },
    mixins: [dataMixin],
    components: {},
    computed: {
        ...mapGetters(["this.$store.state.carts"])
    },
    mounted() {
        this.getCart();
    },
    methods: {
        async getCart() {
            let res = await apiGetCart();
            console.log("res.data.code: ", res.data.code);
            if (res.data.code == -1) {
                this.title = "用户未登陆,请千万登陆~";
                setTimeout(() => {
                    this.$refs.nopage.onDisplay();
                    this.$refs.nopage.onLogin();
                }, 300);
                return;
            }
            this.cartsData = res.data.result;
            console.log("this.cartsData: ", this.cartsData);
            if (this.cartsData.length == 0) {
                this.title = "购物车暂无数据,请前往添加~";
                this.$refs.nopage.onDisplay();
            } else {
                this.cartsData.map(item => {
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
            this.cartsData.splice(index, 1);
        },
        /*提交订单*/
        onOrder() {
            let orderArr = [];
            this.cartsData.forEach(item => {
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

.cart-item {
    border-bottom: 1px solid #cccccc;
    height: 120px;
    padding: 0 20px;
}

.goods-img {
    margin-right: 10px;
    width: 100px;
    height: 100px;
}

.goods-coach {
    color: red;
    align-self: flex-end;
}

.goodsOp {
    margin: 20px 0;
    input {
        border: none;
        font-size: 14px;
        text-align: center;
        width: 30px;
    }
}

.cartBottom-detail {
    height: 40px;
    font-size: 14px;
    width: 100%;
    position: absolute;
    bottom: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    color: @theme_color;
    background: white;
    border-top: 1px solid #ccc;
}

.subminCart {
    padding-right: 20px;
}
</style>
