<template>
    <div class="page">
        <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="onBack" />
        <van-cell-group>
            <van-field v-model="name" label="姓名" placeholder="请输入姓名" required />
            <van-field v-model="phone" required clearable label="手机号码" placeholder="请输入手机号码" />
            <van-field v-model="post" required clearable label="邮编号码" placeholder="邮编号码" />
            <van-field v-model="address" required clearable label="选择地址" readonly placeholder="选择地址" @click="onAddress" />
            <van-field v-model="detailAddress" label="详细地址" type="textarea" placeholder="请输入详细地址" rows="2" required autosize />
        </van-cell-group>
        <div class="area" v-show="showArea">
            <van-area :area-list="areaList" value="440305" @cancel="onCancel" @confirm="onComfirm" />
        </div>
        <div class="pageBottom" @click="onSave">
            <span class="tabbar-label">保存</span>
        </div>
    </div>
</template>

<script>
import areaList from "../../assets/js/areaList.js";
import { mapMutations } from "vuex";
import { apiAddAddress } from "../../api/address.js";
import { Area, Field } from "vant";
export default {
    data() {
        return {
            name: "",
            phone: "",
            post: "",
            address: "",
            detailAddress: "",
            areaList: null,
            showArea: false
        };
    },
    components: {},
    created() {
        this.areaList = areaList;
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
        /*保存地址*/
        async onSave() {
            let res = await apiAddAddress(this.name, this.phone, this.post, this.address, this.detailAddress);
            console.log("res", res);
            this.setAddress(this.addressText);
            this.$router.back();
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
