<template>
    <div class="page">
        <van-nav-bar title="订单详情" left-arrow @click-left="onBack" />

        <div class="container">
            <div>
                <div class="address_show" @click="onAddressChoose">
                    <div v-if="addressChooseName.length == 0"><van-cell title="选择地址" is-link /></div>
                    <div v-else>
                        <div class="flex-space">
                            <div>{{ addressChooseName }}</div>
                            <div>{{ addressChooseTel }}</div>
                        </div>
                        <div>{{ addressChooseAddress }}</div>
                    </div>
                </div>
                <!-- <van-contact-card
          :type="cardType"
          :name="addressChooseName"
          :tel="addressChooseTel"
          
        />-->
                <!-- 联系人列表 -->
                <van-popup v-model="showList" position="bottom"> <van-contact-list v-model="chosenContactId" :list="addressData" @add="onAdd" @edit="onEdit" @select="onSelect" /> </van-popup>
                <van-card
                    v-for="(orderItem, orderIndex) in $store.state.orders"
                    :key="orderIndex"
                    :num="orderItem.num"
                    :price="orderItem.priceNow"
                    :title="orderItem.title"
                    :thumb="orderItem.imgCover"
                />
                <van-submit-bar :price="allCoach" button-text="提交订单" @submit="onOrder" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiAddOrder } from "../../api/order.js";
import { apiGetAddress } from "../../api/address.js";
import { Dialog } from "vant";
export default {
    data() {
        return {
            chosenContactId: null,
            editingContact: {},
            showList: false,
            showEdit: false,
            isEdit: false,
            list: [
                {
                    name: "张三",
                    tel: "13000000000",
                    id: 0
                }
            ],
            allCoach: 0,
            havePage: false,
            slidename: "slide-go",
            prodectId: [],
            addressData: [],
            addressChooseName: "",
            addressChooseTel: "",
            addressChooseAddress: "",
            addressItem: ""
        };
    },
    components: {
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        },

        currentContact() {
            const id = this.chosenContactId;
            return id !== null ? this.list.filter(item => item.id === id)[0] : {};
        },
        ...mapGetters(["this.$store.state.orders", "this.$store.state.chooseaddress"])
    },
    mounted() {
        this.getAddress();
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
        onAddressChoose() {
            this.showList = true;
            console.log("***");
        },
        // 添加联系人
        onAdd() {
            this.$router.push("./addaddress");
        },

        // 编辑联系人
        onEdit(item) {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "edit",
                    item: item
                }
            });
        },
        onSelect(item, index) {
            console.log("item", item);
            this.showList = false;
            this.addressChooseName = item.name;
            this.addressChooseTel = item.tel;
            this.addressChooseAddress = item.address + item.detailAddress;
            this.addressItem = item;
        },
        // 保存联系人
        onSave(info) {
            this.showEdit = false;
            this.showList = false;

            if (this.isEdit) {
                this.list = this.list.map(item => (item.id === info.id ? info : item));
            } else {
                this.list.push(info);
            }
            this.chosenContactId = info.id;
        },
        async getAddress() {
            let res = await apiGetAddress();
            this.addressData = res.data.result;
        },
        /*我的订单*/
        onOrder() {
            Dialog.confirm({
                message: "是否现在结算该订单?"
            })
                .then(() => {
                    this.addOrder("payed");
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                    this.addOrder("paying");
                });
        },
        async addOrder(status) {
            let res = await apiAddOrder(this.prodectId, this.addressItem, this.allCoach, status);
            if ((status = "payed")) {
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
.address_show {
    background: white;
    padding: 10px;
}
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
</style>
