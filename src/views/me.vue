<template>
  <div class="jbn_content">
    <!-- <div class="jbn_bg"></div> -->
    <!-- 头部信息开始 -->
    <div class="jbn_head">
      <div class="jbn_info">
        <div class="jbn_tou">
          <p @click="resetInfo">
            <img :src="userInfo.avatar" alt  style="border-radius:50%"/>
            <span>
              {{userInfo.nickname}}
              <img src="../assets/kao.png" alt class="jbn_i" />
            </span>
          </p>
          <span class="jbn_go" @click="goYue">去约课</span>
        </div>
        <!-- 信息列表开始 -->
        <ul class="jbn_study">
          <li @click="goMystudy">
            <span>
              {{ num }}
            </span>
            <span>我的特色课</span>
            <span>已购买特色课程的学习</span>
          </li>
          <li @click="goAppoint">
            <span>0</span>
            <span>一对一辅导</span>
            <span>我的一对一老师辅导</span>
          </li>
          <li @click="goCurrency">
            <span>0.00</span>
            <span>剩余学习币</span>
            <span>查看剩余学习币</span>
          </li>
        </ul>
        <!-- 信息列表结束 -->
      </div>
    </div>
    <!-- 头部信息结束 -->
    <!-- 邀请部分开始 -->
    <div class="jbn_yao">
      <div @click="zhi">
        <van-icon name="send-gift" color="#fff" size="25px"></van-icon>
        <p>
          <span>邀请好友注册APP，享多重好礼</span>
          <br />
          <span>限时特惠，多邀多得</span>
        </p>
        <van-icon name="arrow" color="#fff" size="25px"></van-icon>
      </div>
    </div>
    <!-- 邀请部分结束 -->
    <!-- 课程相关部分开始 -->
    <div class="jbn_class">
      <h4>课程相关</h4>
      <ul>
        <li @click="goFollow">
          <van-icon name="friends" size="30px" color="#df6433"></van-icon>
          <p>关注的老师</p>
        </li>
        <li @click="goStar">
          <van-icon name="like" size="30px" color="#df6433"></van-icon>
          <p>我的收藏</p>
        </li>
      </ul>
    </div>
    <!-- 课程相关部分结束 -->
    <!-- 订单相关部分开始 -->
    <div class="jbn_class">
      <h4>订单相关</h4>
      <ul>
        <li @click="goClassOrder">
          <van-icon name="balance-list" size="30px" color="#df6433"></van-icon>
          <p>课程订单</p>
        </li>
        <li @click="goVipOrder">
          <van-icon name="balance-list" size="30px" color="#df6433"></van-icon>
          <p>会员订单</p>
        </li>
        <li @click="goAppoinOrder">
          <van-icon name="balance-list" size="30px" color="#df6433"></van-icon>
          <p>约课订单</p>
        </li>
      </ul>
    </div>
    <!-- 订单相关部分结束 -->
    <!-- 我的账户部分开始 -->
    <div class="jbn_class">
      <h4>我的账户</h4>
      <ul>
        <li @click="goCoupon">
          <van-icon name="coupon" size="30px" color="#f4b13e"></van-icon>
          <p>优惠券</p>
        </li>
        <li @click="goStudy">
          <van-icon name="card" size="30px" color="#f4b13e"></van-icon>
          <p>学习卡</p>
        </li>
        <li @click="goVip">
          <van-icon name="gem" size="30px" color="#f4b13e"></van-icon>
          <p>会员</p>
        </li>
      </ul>
    </div>
    <!-- 我的账户部分结束 -->
    <!-- 自助服务部分开始 -->
    <div class="jbn_class jbn_bot">
      <h4>自助服务</h4>
      <ul>
        <li @click="goNews">
          <van-icon name="bell" size="30px" color="#f39d46"></van-icon>
          <p>我的消息</p>
        </li>
        <li @click="goOpinion">
          <van-icon name="comment" size="30px" color="#f39d46"></van-icon>
          <p>意见反馈</p>
        </li>
        <li @click="goEmail">
          <van-icon name="service" size="30px" color="#f39d46"></van-icon>
          <p>在线客服</p>
        </li>
        <li @click="set">
          <van-icon name="setting" size="30px" color="#f39d46"></van-icon>
          <p>设置</p>
        </li>
      </ul>
    </div>
    <!-- 自助服务部分结束 -->
    <!-- 弹出层开始 -->
    <van-popup v-model="show">
      <p class="jbn_tan">
        <img src="../assets/zhi.png" alt />
        <span>长按保存到相册</span>
      </p>
    </van-popup>
    <!-- 弹出层结束 -->
    <Email></Email>
  </div>
</template>
<script>
import Email from "@/components/email";
export default {
  data() {
    return {
      show: false,
      userInfo: [],  //用户信息
      num:""
    };
  },
  created() {},
  mounted() {
    this.getToken();
    this.getUserInfo();
    this.getTitle()
  },
  components: {
    Email
  },
  methods: {
    // 获取token
    getToken() {
      let token = localStorage.getItem("token");
      // console.log(token);
      if (token == null) {
        // console.log("token为空");
        this.$router.push({
          path: "/relogin"
        });
      }
    },
    // 弹出层
    zhi() {
      this.show = true;
    },
    //获取用户信息
    getUserInfo(num) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/userInfo",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params: {
          mobile: this.mobile,
          password: this.pass,
          type: num,
          sms_code: this.sms
        }
      }).then(res => {
        // console.log(res);
        this.userInfo = res.data.data;
      });
    },
    // 点击设置跳转页面
    set() {
      this.$router.push({
        path: "/set"
      });
    },
    // 跳转到留言页面
    goEmail() {
      this.$router.push({
        path: "/email"
      });
    },
    // 跳转到意见反馈页面
    goOpinion() {
      this.$router.push({
        path: "/opinion"
      });
    },
    // 跳转到消息通知页面
    goNews() {
      this.$router.push({
        path: "/news"
      });
    },
    // 跳转到优惠券页面
    goCoupon() {
      this.$router.push({
        path: "/coupon"
      });
    },
    // 跳转到学习卡页面
    goStudy() {
      this.$router.push({
        path: "/study"
      });
    },
    // 跳转到课程订单页面
    goClassOrder() {
      this.$router.push({
        path: "/classOrder"
      });
    },
    // 跳转到会员订单页面
    goVipOrder() {
      this.$router.push({
        path: "/vipOrder"
      });
    },
    // 跳转到约课订单页面
    goAppoinOrder() {
      this.$router.push({
        path: "/appoinOrder"
      });
    },
    // 跳转到关注页面
    goFollow() {
      this.$router.push({
        path: "/follow"
      });
    },
    // 跳转到收藏页面
    goStar() {
      this.$router.push({
        path: "/star"
      });
    },
    // 跳转到约课记录页面
    goAppoint() {
      this.$router.push({
        path: "/appointment"
      });
    },
    // 跳转到一对一辅导页面
    goYue() {
      this.$router.push({
        path: "/yi"
      });
    },
    // 跳转到我的学习页面
    goMystudy(){
      this.$router.push({
        path:"/myStudy"
      })
    },
    // 进入我的信息页面
    resetInfo(){
      this.$router.push({
        path:"/info"
      })
    },
    goVip(){
      this.$router.push({
        path:"/vip"
      })
    },
    goCurrency(){
      this.$router.push({
        path:"/currency"
      })
    },
    // 我的课程数量
    getTitle() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/myStudy/2?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res);
        this.num=res.data.data.courseList.length
        // this.navList = res.data.data.typeNum;
        // this.classList = res.data.data.courseList;
      });
    },
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.jbn_content {
  width: 100%;
  background: #fefefe;
  position: relative;
}
.jbn_bg {
  width: 1000px;
  height: 1000px;
  background: #eb622b;
  border-radius: 50%;
  position: fixed;
  top: -650px;
  left: -125px;
}
.jbn_head {
  width: 750px;
  height: 436px;
  padding: 90px 30px 0px;
  background: url("../assets/bg1.jpg");
  box-sizing: border-box;
  background-size: 100% 250px;
  background-repeat: no-repeat;
  .jbn_info {
    width: 690px;
    height: 346px;
    background: #fff;
    border-radius: 7px;
    border: 1px solid #ccc;
  }
}
.jbn_tou {
  width: 690px;
  height: 184px;
  padding: 30px 0px 30px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    width: 380px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 124px;
      height: 124px;
    }
  }

  .jbn_i {
    width: 30px;
    height: 30px;
  }
}
.jbn_go {
  width: 115px;
  height: 50px;
  background: #db6b2c;
  border-radius: 15px 0px 0px 15px;
  color: #fff;
  display: block;
  text-align: center;
  font-size: 22px;
}
.jbn_study {
  width: 100%;
  height: 162px;
  // background: red;
  display: flex;
  justify-content: space-around;
  li {
    position: relative;
    z-index: 99999999999999999999999;
    display: flex;
    flex-direction: column;
    text-align: center;
    span:nth-of-type(1) {
      font-size: 34px;
      color: #e4550b;
    }
    span:nth-of-type(2) {
      font-size: 26px;
      color: #626262;
    }
    span:nth-of-type(3) {
      font-size: 20px;
      color: #adadad;
    }
  }
}
.jbn_yao {
  width: 100%;
  height: 118px;
  padding: 30px 30px 0px 30px;
  box-sizing: border-box;
  div {
    display: flex;
    justify-content: space-between;
    background: #dd6d2d;
    border-radius: 38px;
    width: 690px;
    height: 90px;
    padding: 18px 30px;
    box-sizing: border-box;
    p {
      color: #fff;
      width: 500px;
      span:nth-of-type(1) {
        font-size: 22px;
      }
      span:nth-of-type(2) {
        font-size: 16px;
      }
    }
  }
}
.jbn_class {
  width: 100%;
  height: 238px;
  // background: red;
  padding: 40px 30px;
  box-sizing: border-box;
  h4 {
    font-size: 30px;
  }
  ul {
    width: 690px;
    height: 162px;
    display: flex;
    padding: 40px 0px;
    box-sizing: border-box;
    border-bottom: 2px solid #efefef;
    li {
      width: 170px;
      text-align: center;
      p {
        font-size: 22px;
        color: #5f5f5f;
      }
    }
  }
}
.jbn_bot {
  margin-bottom: 106px;
}
.jbn_tan {
  display: flex;
  color: #ccc;
  img {
    width: 50px;
    height: 50px;
  }
}
.van-popup {
  background: none;
}
</style>
