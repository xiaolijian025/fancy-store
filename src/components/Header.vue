<template>
    <header id="headerTab">
        <p>{{ tabname }}</p>
    </header>
</template>

<script>
export default {
    props: ["tabname"],
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
@import "../../public/less/variable.less";
header {
    text-align: center;
    background: @theme_background;
    color: @base_color;
    font-size: 14px;
    line-height: 40px;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
}
</style>
