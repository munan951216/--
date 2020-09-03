<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>会员订单</span>
      <span></span>
    </p>
    <van-tabs v-model="activeName" title-active-color="red" line-width="34px" line-height="3px">
      <van-tab title="全部订单" name="a">
        <div class="jbn_list">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
      </van-tab>
      <van-tab title="待支付" name="b">
        <div class="jbn_list">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
      </van-tab>
      <van-tab title="已完成" name="c">
        <div class="jbn_list">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
      </van-tab>
      <van-tab title="已取消" name="d">
        <div class="jbn_list">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
      </van-tab>
    </van-tabs>
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
  color: #a0a0a0;
}
/deep/.van-tabs {
  height: 88px;
  border-bottom: 3px solid #f9f9f9;
}
/deep/.van-tab {
  height: 88px;
}
/deep/.van-tab__text--ellipsis {
  height: 88px;
  line-height: 88px;
}
/deep/.van-tabs__nav--line {
  height: 88px;
}
/deep/.van-tabs__wrap {
  height: 88px;
}
.jbn_list {
  width: 100%;
  padding: 0px 220px;
  box-sizing: border-box;
  img {
    width: 300px;
    height: 300px;
  }
  p {
    font-size: 30px;
    color: #a3a3a3;
    padding-top: 40px;
    text-align: center;
  }
}
</style>
