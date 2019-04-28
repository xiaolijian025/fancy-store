<template>
    <div class="page">
        <van-nav-bar :title="title" left-arrow @click-left="onBack"> <van-icon name="delete" slot="right" v-if="state == 'edit'" @click="onDelete" /> </van-nav-bar>
        <van-cell-group>
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" required />
            <van-field v-model="tel" required clearable label="手机号码" placeholder="请输入手机号码" />
            <van-field v-model="post" required clearable label="邮编号码" placeholder="邮编号码" />
            <van-field v-model="address" required clearable label="选择地址" readonly placeholder="选择地址" @click="onAddress" />
            <van-field v-model="detailAddress" label="详细地址" type="textarea" placeholder="请输入详细地址" rows="2" required autosize />
        </van-cell-group>
        <div class="area" v-show="showArea"><van-area :area-list="areaList" value="440305" @cancel="onCancel" @confirm="onComfirm" /></div>
        <div class="pageBottom" @click="onSave">
            <span class="tabbar-label">{{ $route.query.state == "edit" ? "编辑" : "添加" }}</span>
        </div>
    </div>
</template>

<script>
import areaList from "../../assets/js/areaList.js";
import { mapMutations } from "vuex";
import { apiAddAddress, apiDeleteAddress, apiUpdateAddress } from "../../api/address.js";
import { Area, Field, Dialog } from "vant";
export default {
    data() {
        return {
            name: "",
            tel: "",
            post: "",
            address: "",
            detailAddress: "",
            areaList: null,
            showArea: false,
            title: "添加地址",
            state: "add"
        };
    },
    components: {},
    created() {
        this.areaList = areaList;
        if (this.$route.query.state == "edit") {
            let data = this.$route.query.item;
            console.log("data: ", data);
            this.name = data.name;
            this.tel = data.tel;
            this.post = data.post;
            this.address = data.address;
            this.detailAddress = data.detailAddress;
            this.title = "编辑地址";
            this.state = "edit";
        }
    },
    mounted() {},

    methods: {
        onAddress() {
            this.showArea = !this.showArea;
        },
        onComfirm(val) {
            val.map(item => {
                this.address = `${this.address} ${item.name}`;
            });
            this.showArea = false;
        },
        onCancel() {
            this.showArea = false;
        },
        onDelete() {
            Dialog.confirm({
                message: "确定删除?"
            })
                .then(() => {
                    this.sureDelete();
                })
                .catch(() => {
                    // on cancel
                });
        },
        async sureDelete() {
            let res = await apiDeleteAddress(this.$route.query.item.id);
            this.onBack();
        },
        /*保存地址*/
        async onSave() {
            if (this.state == "add") {
                let res = await apiAddAddress(this.name, this.tel, this.post, this.address, this.detailAddress);
            } else {
                let res = await apiUpdateAddress(this.name, this.tel, this.post, this.address, this.detailAddress, this.$route.query.item._id);
            }

            this.setAddress(this.addressText);
            this.onBack();
        },
        ...mapMutations({
            setAddress: "SET_ADDRESS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.area {
    position: absolute;
    bottom: 50px;
    width: 100%;
}

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
</style>
