<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" size="25px"></van-icon>
      <span>仿真模考</span>
      <van-icon name="search" size="25px" @click="goSearch"></van-icon>
    </p>
    <!-- 下拉菜单开始 -->
    <van-dropdown-menu>
      <van-dropdown-item title="考试类型" ref="item">
        <div class="jbn_all">
          <p>全部</p>
          <p>模拟考试</p>
          <p>正式考试</p>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="考试状态" ref="item">
        <div class="jbn_all">
          <p>全部</p>
          <p>未开始</p>
          <p>进行中</p>
          <p>已结束</p>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="参考状态" ref="item">
        <div class="jbn_all">
          <p>全部</p>
          <p>已做</p>
          <p>未做</p>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉菜单结束 -->
    <!-- 列表部分开始 -->
    <div class="jbn_rollList">
      <img src="../../assets/empty.png" alt />
      <p>请稍候，套卷正在赶来的路上啦</p>
    </div>
    <!-- 列表部分结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 跳转到搜索页面
    goSearch() {
      this.$router.push({
        path: "/search"
      });
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
  height: 100px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #f4f4f4;
  font-size: 36px;
}
/deep/ .van-dropdown-menu {
  height: 80px;
}
/deep/ .van-dropdown-menu__bar {
  height: 80px;
}
.jbn_list {
  width: 100%;
  height: 570px;
  /deep/ .van-sidebar {
    width: 300px;
    height: 100%;
  }
  /deep/ .van-sidebar-item {
    height: 100px;
  }
  /deep/ .van-sidebar-item__text {
    height: 100px;
    width: 300px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
  }
}
.jbn_all {
  width: 100%;
  //   height: 300px;
  p {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #595959;
    font-size: 28px;
  }
  p:nth-of-type(2) {
    border-top: 3px solid #f5f5f5;
    border-bottom: 3px solid #f5f5f5;
  }
}
.jbn_rollList {
  width: 100%;
  text-align: center;
  img {
    width: 310px;
    height: 310px;
  }
  p {
    font-size: 30px;
    color: #9b9794;
    margin-top: 40px;
  }
}
</style>
