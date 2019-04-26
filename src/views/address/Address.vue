<template>
    <div class="page">
        <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onBack" />

        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <nopage ref="nopage" :title="title"></nopage>

                <div>
                    <div class="address-item flex" v-for="(addressItem, addressIndex) in addressData" @click="onChooseAddress(addressItem)" :key="addressIndex">
                        <p>{{ addressItem.address }}</p>
                        <p>{{ addressItem.phone }}</p>
                    </div>
                </div>
            </div>
        </transition>
        <div class="pageBottom" @click="onAddAddress">
            <span class="tabbar-label">新增地址</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetAddress } from "../../api/address.js";
import { dataMixin } from "../../mixins/dataMixin.js";
export default {
    data() {
        return {
            addressData: []
        };
    },
    mixins: [dataMixin],
    components: {},
    computed: {
        ...mapGetters(["this.$store.state.address", "this.$store.state.chooseaddress", "this.$store.state.ischoose"])
    },

    mounted() {
        this.getAddress();

        /*判断动画是进还是出*/
        this.$store.state.comname === "addressadd" ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setComname("address");
    },

    methods: {
        /*添加地址*/
        onAddAddress() {
            this.$router.push("./addaddress");
        },
        /*选择地址*/
        onChooseAddress(item) {
            if (this.$store.state.ischoose == 1) {
                this.setChooseaddress(item);
                this.$router.push("./orderwait");
                this.setIschoose(2);
            }
        },
        async getAddress() {
            let res = await apiGetAddress();
            this.addressData = res.data.result;
            this.addressData.length === 0 ? (this.havePage = false) : (this.havePage = true);
        },
        ...mapMutations({
            setChooseaddress: "SET_CHOOSEADDRESS",
            setIschoose: "SET_ISCHOOSE"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.pageBottom {
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    line-height: 40px;
    color: @base_color;
    font-size: 14px;
    text-align: center;
}

.address-item {
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    justify-content: space-around;
}
</style>
