<template>
    <div>
        <router-view />
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/product">产品</van-tabbar-item>
            <van-tabbar-item icon="cluster-o" dot to="/category">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" info="5" to="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="friends-o" info="20" to="/member">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
    data() {
        return {
            active: 0
        };
    },
    created() {}
};
</script>
