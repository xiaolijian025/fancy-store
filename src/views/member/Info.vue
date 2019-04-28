<template>
    <div class="page">
        <van-nav-bar title="个人信息" left-arrow @click-left="onBack" />
        <van-uploader :after-read="onRead">
            <img class="avatar" src="../../assets/logo.png" ref="avatar" alt />
        </van-uploader>

        <van-cell-group>
            <van-cell title="用户名" :value="userData.user" />
            <van-cell title="性别" :value="userData.sex" @click="show = true" />
        </van-cell-group>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import { apiGetUser, apiEditUser } from "../../api/user.js";
import { apiGetQiNiuToken } from "../../api/upload.js";
import { Uploader } from "vant";
import * as qiniu from "qiniu-js";
import axios from "axios";
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
            ],
            uploadToken: {
                token: ""
            },
            coverJoinUrl: ""
        };
    },
    components: {},
    mounted() {
        this.getUser();
        this.onUpload();
        console.log("eee");
    },
    methods: {
        onRead(file) {
            console.log(file);
            this.$refs.avatar.src = file.content;
            let data = new FormData();
            data.append("token", this.uploadToken.token);
            data.append("file", file);
            const axiosInstance = axios.create({ withCredentials: false });
            console.log("data: ", data);
            axiosInstance({
                method: "POST",
                url: "http://upload.qiniup.com/", //上传地址
                data: data,
                timeout: 30000 //超时时间，因为图片上传有可能需要很久
            })
                .then(data => {
                    console.log("data", data);

                    //   this.coverJoinUrl =  `http://pp7f9imv2.bkt.clouddn.com/${data.data.key}`
                    //上传成功...  (登录七牛账号，找到七牛给你的 URL地址) 和 data里面的key 拼接成图片下载地址
                })
                .catch(function(err) {
                    //上传失败
                    console.log("err", err);
                });
        },
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
        },
        async onUpload() {
            const res = await apiGetQiNiuToken();
            this.uploadToken.token = res.data.token;
            console.log("this.uploadToken.token: ", this.uploadToken.token);
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
.avatar {
    width: 100px;
    height: 100px;
}
</style>
