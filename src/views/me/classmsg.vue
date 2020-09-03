<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>课程订单</span>
      <span></span>
    </p>
    <div class="jbn_msgList">
      <div v-for="(item,index) in classMsg" :key="index">
        <p>{{ item.created_at | dataTime1}}</p>
        <p>{{ item.content}}</p>
      </div>
    </div>
    <p class="jbn_more">没有更多了</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classMsg: []
    };
  },
  created() {},
  mounted() {
    // this.getMsg();
    this.getClassMsg();
  },
  methods: {
    // 点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    getClassMsg() {
      console.log(123);
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/message/getMessage",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          page: 1,
          limit: 10,
          message_classify: "course"
        }
      }).then(res => {
        console.log(res);
        this.classMsg=res.data.data.list
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
.jbn_msgList {
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  // height: 210px;
  div {
    width: 690px;
    height: 170px;
    border-bottom: 2px solid #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p:nth-of-type(1) {
      width: 194px;
      height: 50px;
      background: #b7b7b7;
      border-radius: 10px;
      color: #fff;
      line-height: 50px;
      text-align: center;
      margin: 0px auto;
    }
    p:nth-of-type(2) {
      color: #a9adbe;
      font-size: 26px;
    }
  }
}
.jbn_more {
  width: 100%;
  text-align: center;
  color: #9f98a1;
  font-size: 26px;
}
</style>
