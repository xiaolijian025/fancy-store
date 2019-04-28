<template>
    <div class="page">
        <van-nav-bar title="设置" left-arrow @click-left="onBack" />

        <van-cell-group>
            <van-cell title="语言" :value="$t('m.local')" @click="show = true" />
        </van-cell-group>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import { apiGetUser, apiEditUser } from "../../api/user.js";
export default {
    data() {
        return {
            userData: {},
            show: false,
            actions: [
                {
                    name: "中文"
                },
                {
                    name: "English"
                }
            ]
        };
    },
    components: {},
    mounted() {},
    methods: {
        onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            let lang = "";
            this.show = false;
            this.userData.lang = item.name;
            console.log("item.name: ", item.name);
            item.name == "中文" ? (this.$i18n.locale = "en") : (this.$i18n.locale = "zh");
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    text-align: center;
    img {
        margin-top: 30px;
    }
    p {
        margin-top: 30px;
        font-size: 28px;
    }
}
</style>
