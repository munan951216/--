<template>
    <div>
        <p class="jbn_nav">
            <van-icon name="arrow-left" @click="goBack"></van-icon>
            <span>学习日历</span>
            <span></span>
        </p>
        <div class="jbn_calendar">
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
};
</script>

<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
}
.jbn_nav{
    width:100%;
    height:88px;
    border:2px solid #f4f4f4;
    padding:0px 30px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    box-sizing: border-box;
}
</style>
