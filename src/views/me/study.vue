<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>我的优惠券</span>
      <span>学习卡兑换</span>
    </p>
    <div class="jbn_dui">
        <img src="../../assets/quan_03.jpg" alt="">
        <p>暂无兑换记录</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
      goBack(){
          this.$router.go(-1)
      }
  }
};
</script>

<style scoped lang="scss">
// .jbn_content{
//     width:100%;
//     height:100%;
//     background: #f0f2f5;
// }
* {
  margin: 0;
  padding: 0;
}
.jbn_nav {
  width: 100%;
  height: 88px;
  border-bottom: 2px solid #fbfbfb;
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 30px;
  align-items: center;
  color:#a0a0a0;
  background: #fff;
}
.jbn_dui{
    width:100%;
    padding:220px;
    box-sizing: border-box;
    img{
        width:300px;
        height:300px;
    }
    p{
        font-size:30px;
        color:#a3a3a3;
        padding-top:40px;
        text-align:center;
    }
}
</style>
