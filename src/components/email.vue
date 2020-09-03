<template>
    <div>
        <div class="jbn_email" @click="toEmail" ref="box">
            <img src="@/assets/email.png" alt="">
        </div>
    </div>
</template>

<script>
import Draggable from "draggable"
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {
        this.drag()
    },
    methods: {
        toEmail(){
            // console.log(123)
            this.$router.push({
                path:"/email"
            })
        },
        drag(){
            var element=this.$refs.box
            new Draggable(element)
        }
    }
};
</script>

<style scoped lang="scss">
.jbn_email{
    width:125px;
    height:125px;
    background: #3478f5;
    position: fixed;
    bottom:150px;
    right:50px;
    text-align:center;
    line-height:125px;
    border-radius:50%;

    img{
        width: 50px;
        height:35px;
    }
}
</style>
