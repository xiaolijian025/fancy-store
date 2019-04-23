<template>
    <header id="headerTab" class="flex flex-align-center">
        <i class="el-icon-arrow-left" @click="onBack"></i>
        <p class="tabname">{{ tabname }}</p>
    </header>
</template>

<script>
export default {
    props: ["tabname"],
    data() {
        return {
            isBack: true
        };
    },
    methods: {
        onBack() {
            console.log("111");
            if (this.isBack) {
                this.$router.back();
            } else {
                this.$router.push("./member");
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../public/less/base.less";
header {
    text-align: center;
    background: @theme_background;
    color: @base_color;
    font-size: 14px;
    height: 40px;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
}

.tabname {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}
i {
    padding-left: 16px;
    z-index: 10;
}
</style>
