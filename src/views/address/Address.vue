<template>
    <div class="page">
        <van-nav-bar title="我的地址" left-arrow @click-left="onBack" />
        <van-address-list v-model="chosenAddressId" :list="addressData" @edit="onEditAddress" @add="onAddAddress" />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetAddress } from "../../api/address.js";
import { dataMixin } from "../../mixins/dataMixin.js";
export default {
    data() {
        return {
            addressData: [],
            chosenAddressId: ""
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
        onAddAddress(item, index) {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "add"
                }
            });
        },
        onEditAddress(item, index) {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "edit",
                    item: item
                }
            });
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
            this.addressData.length > 0 && (this.chosenAddressId = this.addressData[0].id);
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
