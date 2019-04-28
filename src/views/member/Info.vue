<template>
    <div class="page">
        <van-nav-bar title="个人信息" left-arrow @click-left="onBack" />

        <van-cell-group>
            <van-cell title="用户名" :value="userData.user" />
            <van-cell title="性别" :value="userData.sex" @click="show = true" />
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
                    name: "男"
                },
                {
                    name: "女"
                }
            ]
        };
    },
    components: {},
    mounted() {
        this.getUser();
        console.log("eee");
    },
    methods: {
        async getUser() {
            console.log(111);
            let res = await apiGetUser();
            this.userData = res.data.result;
            this.userData.sex == "women" && (this.userData.sex = "女");
            this.userData.sex == "man" && (this.userData.sex = "男");
            console.log("res", res);
        },
        async onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            let sex = "";
            this.show = false;
            this.userData.sex = item.name;
            item.name == "男" ? (sex = "man") : (sex = "women");
            console.log("sex: ", sex);
            let res = await apiEditUser(sex);
            console.log("res", res);
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
