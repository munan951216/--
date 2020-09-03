<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>消息通知</span>
      <span></span>
    </p>
    <!-- 消息通知列表开始 -->
    <ul>
      <li @click="toclassMsg">
        <img src="../../assets/new_03.jpg" alt />
        <p>
          <span>课程通知</span>
          <span v-if="classMsg.length==0">暂无消息</span>
          <span v-else v-for="(item,index) in classMsg" :key="index">{{item.content}}</span>
        </p>
      </li>
      <li>
        <img src="../../assets/new_06.jpg" alt />
        <p>
          <span>系统通知</span>
          <span>暂无消息</span>
        </p>
      </li>
      <li @click="toOrderMsg">
        <img src="../../assets/new_08.jpg" alt />
        <p>
          <span>订单通知</span>
          <span v-if="orderMsg.length==0">暂无消息</span>
          <span v-else v-for="(item,index) in orderMsg" :key="index">{{item.content}}</span>
        </p>
      </li>
      <li>
        <img src="../../assets/new_10.jpg" alt />
        <p>
          <span>约课通知</span>
          <span>暂无消息</span>
        </p>
      </li>
      <li>
        <img src="../../assets/new_12.jpg" alt />
        <p>
          <span>考试通知</span>
          <span>暂无消息</span>
        </p>
      </li>
    </ul>
    <!-- 消息通知列表结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      megList: [], //信息列表
      classMsg: [], //课程通知
      orderMsg: [] //订单通知
    };
  },
  created() {},
  mounted() {
    this.getMsg();
    // this.getClassMsg();
  },
  methods: {
    //   点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取信息
    getMsg() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/message/classifyMessage",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST"
      }).then(res => {
        this.megList = res.data.data;
        console.log(this.megList);
        console.log(res);
        this.orderMsg = this.megList.filter(item => {
          return item.message_classify == "order";
        });
        this.classMsg = this.megList.filter(item => {
          return item.message_classify == "course";
        });
        console.log(this.orderMsg);
      });
    },
    // 点击进入课程通知页面
    toclassMsg() {
      this.$router.push({
        path: "/classmsg"
      });
    },
    // 点击进入订单通知页面
    toOrderMsg() {
      this.$router.push({
        path: "/ordermsg"
      });
    },
    // 获取课程通知消息
  
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
}
ul {
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  li {
    // height: 140px;
    padding: 30px 0px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 3px solid #f9f9f9;
    img {
      width: 90px;
      height: 90px;
    }
    p {
      display: flex;
      // height: 82px;
      justify-content: space-between;
      flex-direction: column;
      padding-left: 30px;
      font-size: 28px;
      color: #606060;
    }
  }
}
</style>
