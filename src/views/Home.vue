<template>
    <div class="page">
        <headers :tabname="$t('m.HeaderIndex')"></headers>
        <div class="langBox" @click="changeLang">{{ $t("m.local") }}</div>
        <div class="container">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex"><img :src="bannerItem.img" /></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="product_header">热门推荐</div>
            <div class="content flex">
                <div v-for="(productItem, productIndex) in productList" class="product_item" :key="productIndex">
                    <img :src="productItem.imgCover" alt />
                    <div class="flex-space">
                        <div class="product_item_text">
                            <div>{{ productItem.title }}</div>
                            <div class="product-price flex">
                                <div>{{ productItem.priceNow }}</div>
                                <div class="product-price-origin">{{ productItem.priceOrigin }}</div>
                            </div>
                        </div>
                        <div class="goods-cartBox"><i class="el-icon-goods" @click.stop="onAddCart(productItem)"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <footers :urlRouter="$route.path" :cartnum="cartLength" ref="footer"></footers>
    </div>
</template>

<script>
import Swiper from "swiper";
import { apiGetProduct, apiGetBanner } from "../api/product.js";
import { apiAddCart } from "../api/cart.js";
import "../../public/css/swiper.min.css";
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
    components: {
        Headers: () => import("../components/Header"),
        Footers: () => import("../components/Footer")
    },
    mounted() {
        new Swiper(".swiper-container", {
            pagination: {
                el: ".swiper-pagination"
            },
            paginationClickable: true,
            spaceBetween: 0,
            autoplay: 1500,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
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
@import "../../public/less/variable.less";
// @import "../../public/css/swiper.min.css";
.swiper-slide img {
    width: 100%;
    height: 100%;
}
.container {
    padding-bottom: 0;
    font-size: 16px;
}
.content {
    //   margin-top: 20px;
    flex-wrap: wrap;
    padding-bottom: 44px;
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
