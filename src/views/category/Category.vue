<template>
    <div class="page">
        <van-nav-bar :title="$t('m.HeaderCategoty')" background="#6495ed" />
        <div class="container flex" id="container">
            <van-tabs v-model="active" swipeable @click="onBar">
                <van-tab :title="menuItem.title" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex">
                    <div class="rightItem" v-for="(categoryItem, categoryIndex) in categoryList" @click="onDetail(categoryItem)" :key="categoryIndex">
                        <div class="category-item flex">
                            <div class="item flex detail-item">
                                <img class="goods-img" v-lazy="categoryItem.imgCover" />
                                <div class="goods-textBox">
                                    <p class="goods-name">{{ categoryItem.title }}</p>
                                    <p class="goods-coach">¥{{ categoryItem.priceNow }}</p>
                                    <div class="goods-cartBox">
                                        <i class="el-icon-goods" @click.stop="onAddCart(categoryItem)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { apiGetProduct } from "../../api/product.js";
import { apiGetCategoryMenu } from "../../api/category.js";
import { dataMixin } from "../../mixins/dataMixin.js";
export default {
    data() {
        return {
            menuList: [],
            categoryList: [],
            categoryContent: [],
            slidename: "slide-back",
            pageNum: 0,
            type: "糖果·巧克力",
            active: 0
        };
    },
    mixins: [dataMixin],
    components: {},
    computed: {
        ...mapGetters(["carts", "this.$store.state.tabindex"])
    },

    mounted() {
        this.setComname("category");
        this.$store.state.tabindex == undefined && this.setTabindex(0);
        this.getMenuList();
        this.getCategoryList();
    },
    methods: {
        /*获取分类栏目*/
        async getMenuList() {
            let res = await apiGetCategoryMenu();
            this.menuList = res.data.result;
        },
        /*获取分类列表*/
        async getCategoryList(tyoe) {
            let res = await apiGetProduct(this.pageNum, this.type);
            this.categoryList = res.data.result;
        },
        /*切换分类*/
        onBar(index, title) {
            this.type = title;
            this.getCategoryList();
        },
        /*添加购物车*/
        onAddCart(item) {
            if (!this.$store.state.carts.includes(item)) {
                if (!this.$refs.footer.showNum) {
                    this.setCarts(item);
                    this.cartLength = this.$store.state.carts.length;
                    this.$refs.footer.showNum = true;
                }
            } else {
                this.$refs.message.messageShow = true;
            }
        },
        /*进入商品详情*/
        onDetail(item) {
            this.$router.push("/detail");
            this.setGoods(item);
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.container {
    display: flex;
    align-items: flex-start;
}
.category {
    //   padding-top: 40px;
    //   padding-bottom: 44px;
}

.rightItem {
    width: 100vw;
}
.leftbar {
    position: fixed;
    left: 0;
    //   top: 40px;
    width: 90px;
    font-size: 14px;
    text-align: center;
    height: 88%;
    border-right: 1px solid #ccc;
}

.barItem {
    line-height: 40px;
    border-bottom: 1px solid #ccc;
}

.rightContent {
    flex: 1;
    margin-left: 90px;
}

.active.menu-text {
    background: @theme_background;
    color: @base_color;
}

.category-item {
    border-bottom: 1px solid #ccc;
    height: 110px;
    width: 100%;
}

.detail-item {
    width: 100%;
}

.goods-textBox {
    width: 100%;
}

.goods-img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
}

.goods-name {
    font-size: 14px;
}

.goods-coach {
    font-size: 13px;
    color: red;
    margin: 10px 0;
}

.goods-cartBox {
    margin-right: 20px;
}
.el-tabs {
    width: 98%;
}
</style>
