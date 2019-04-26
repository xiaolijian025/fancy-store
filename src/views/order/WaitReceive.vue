<template>
    <div class="page orderpage">
        <div class="ordercontainer" v-show="mainarea">
            <img src="../../../public/img/github.png" alt />
            <p>待收货页面</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    components: {},
    computed: {
        ...mapGetters(["this.$store.state.ordercur"])
    },
    mounted() {
        this.$refs.noback.isBack = false;
        this.setOrdercur(4);
        this.$store.state.ordercur < this.$store.state.ordertab ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setOrdertab(4);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./orderdown");
        },
        onSwipeRight() {
            this.$router.push("./waitdeliver");
        },
        ...mapMutations({
            setOrdercur: "SET_ORDERCUR",
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>
