<template>
    <div class="page">
        <headersec tabname="添加地址"></headersec>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <input type="text" placeholder="选择地区" :value="addressText" readonly @click="addressModel = true" />

                <div class="model" v-show="addressModel" @click="addressModel = false">
                    <div class="model-content" @click.stop="addressModel = true">
                        <div class="addressBox">
                            <ul>
                                <li
                                    v-for="(provinceItem, provinceIndex) in addressList"
                                    @click.stop="onProvinceSelect(provinceIndex, provinceItem.text)"
                                    :class="{ active: provinceIndex === activeProvince }"
                                    :key="provinceIndex"
                                >
                                    <span>{{ provinceItem.text }}</span>
                                    <div class="cityBox">
                                        <ul>
                                            <li
                                                v-for="(cityItem, cityIndex) in provinceItem.children"
                                                @click.stop="onCitySelect(cityIndex, cityItem.text)"
                                                :class="{ active: cityIndex === activeCity }"
                                                :key="cityIndex"
                                            >
                                                <span>{{ cityItem.text }}</span>
                                                <div class="areaBox">
                                                    <ul>
                                                        <li
                                                            v-for="(areaItem, areaIndex) in cityItem.children"
                                                            @click.stop="onAreaSelect(areaIndex, areaItem.text)"
                                                            :class="{ active: areaIndex == activeArea }"
                                                            :key="areaIndex"
                                                        >
                                                            <span>{{ areaItem.text }}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <el-input placeholder="输入电话号码" v-model="phone" clearable></el-input>
            </div>
        </transition>
        <div class="pageBottom" @click="onSave"><span class="tabbar-label">保存</span></div>
    </div>
</template>

<script>
import init_city_picker from "../../assets/js/data.city.js";
import { mapMutations } from "vuex";
import { apiAddAddress } from "../../api/address.js";
export default {
    data() {
        return {
            addressModel: false,
            addressList: [],
            province: "",
            city: "",
            area: "",
            addressText: "请选择",
            activeProvince: 0,
            activeCity: 0,
            activeArea: 0,
            phone: ""
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec")
    },

    mounted() {
        this.addressList = init_city_picker;
        this.setComname("addressadd");
    },

    methods: {
        /*选择省份*/
        onProvinceSelect(index, item) {
            this.activeProvince = index;
            this.province = item;
            this.addressText = this.province;
        },
        /*选择城市*/
        onCitySelect(index, item) {
            this.activeCity = index;
            this.city = item;
            this.addressText = `${this.province} ${this.city}`;
        },
        /*选择区域*/
        onAreaSelect(index, item) {
            this.activeArea = index;
            this.area = item;
            this.addressText = `${this.province} ${this.city} ${this.area}`;
            this.addressModel = false;
        },
        /*保存地址*/
        async onSave() {
            let res = await apiAddAddress(this.addressText, this.phone);
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
.addressBox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    z-index: 9;
    background: #f5f5f5;
    display: block !important;
}

.addressBox ul {
    width: 33%;
    height: 250px;

    background: @base_color;
    overflow-y: scroll;
    overflow-x: auto;
}

.addressBox li {
    font-size: 13px;
    line-height: 30px;
    color: @base_textColor;
    text-align: left;
    padding-left: 25px;
}

.cityBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 100%;
    height: 250px;

    display: none;
    overflow-y: scroll;
    z-index: 19;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
}

.cityBox ul {
    width: 100%;
    height: 250px;
}

.cityBox li {
    padding-left: 8px;
    text-align: left;
    border-bottom: 1px solid #e6e6e6;
}

.areaBox {
    position: absolute;
    top: 0;
    left: 33%;
    width: 33%;
    height: 250px;

    display: none;
    overflow-y: scroll;
    z-index: 9999;
    -webkit-overflow-scrolling: touch;
}

.model-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    margin: auto;
    background-color: #ffffff;
    text-align: center;
}

input {
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    margin-top: 15px;
    border: 1px solid #ccc;
    line-height: 40px;
    margin-bottom: 20px;
}
/*点击省份，出现城市*/

.addressBox .active {
    background: @theme_background;
    color: @base_color;
}

.addressBox .active .cityBox {
    display: block;
}
/*点击城市，出现区域*/

.cityBox .active {
    background: @theme_background;
}

.cityBox .active .areaBox {
    display: block;
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
