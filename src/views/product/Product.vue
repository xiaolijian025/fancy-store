<template>
    <div class="page">
        <van-nav-bar :title="$t('m.HeaderIndex')" />

        <div class="langBox" @click="changeLang">{{ $t("m.local") }}</div>
        <!-- <van-pull-refresh> -->
        <div class="container">
            <van-swipe :autoplay="3000" class="swipe">
                <van-swipe-item v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex"> <img class="swipe_img" v-lazy="bannerItem.img" /> </van-swipe-item>
            </van-swipe>
            <div class="product_header">热门推荐</div>
            <div class="content flex">
                <div v-for="(productItem, productIndex) in productList" class="product_item" :key="productIndex">
                    <img :src="productItem.imgCover" alt />
                    <div class="flex-space">
                        <div class="product_item_text">
                            <div>{{ productItem.title }}</div>
                            <div class="product-price flex">
                                <div>{{ productItem.priceNow }}</div>
                                <div class="product-prfice-origin">{{ productItem.priceOrigin }}</div>
                            </div>
                        </div>
                        <div class="goods-cartBox"><van-icon name="cart-o" @click.stop="onAddCart(productItem)" /></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </van-pull-refresh> -->
    </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import { apiGetProduct, apiGetBanner } from "../../api/product.js";
import { apiAddCart } from "../../api/cart.js";
import { Toast } from "Vant";
export default {
    data() {
        return {
            pageNum: 0,
            bannerList: [],
            productList: [],
            slidename: "slide-back"
        };
    },
    components: {},
    mounted() {
        this.getBannerList();
        this.getProductData();
    },

    methods: {
        async getProductData() {
            let res = await apiGetProduct(this.pageNum, "热门");
            this.productList = res.data.result;
            console.log("this.productList", this.productList);
        },

        /*切换语言包 */
        changeLang() {
            this.$i18n.locale == "zh" ? (this.$i18n.locale = "en") : (this.$i18n.locale = "zh");
        },
        /*获取商品列表*/
        async getGoodsList() {
            let res = await this.$http.get("/api/homedata");
            this.productList = res.data.data;
        },
        /*获取轮播列表*/
        async getBannerList() {
            let res = await apiGetBanner();
            this.bannerList = res.data.result;
        },
        /*进入商品详情*/
        onGoodsDetail(item, id) {
            this.$router.push({
                path: "/detail",
                query: {
                    id: id
                }
            });
            this.setGoods(item);
        },
        /*添加到购物车*/
        async onAddCart(item) {
            let res = await apiAddCart(item._id);
            res.data.code == 1 && Toast.success("添加成功");
        },
        /*前往分类页面*/
        onCategory(index) {
            this.setTabindex(index);
            this.$router.push("./category");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";

.swiper {
    height: 100px;
}
.swipe_img {
    width: 100%;
    height: 160px;
}
.container {
    padding-bottom: 0;
    font-size: 16px;
}
.content {
    //   margin-top: 20px;
    flex-wrap: wrap;
    padding-bottom: 52px;
}
.product_header {
    font-size: 16px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.product_item {
    width: 50%;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: white;
    padding-right: 10px;
    &:nth-of-type(even) {
        border-right: none;
    }
    img {
        width: 100%;
        height: 180px;
    }
}
.product_item_text {
    color: #666;
    padding: 1px 8px;
}

.langBox {
    position: fixed;
    right: 10px;
    top: 10px;
    font-size: 13px;
    z-index: 10;
    color: white;
}
</style>
