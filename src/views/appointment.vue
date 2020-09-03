<template>
  <div class="jbn_content">
    <van-nav-bar title="约课记录" />
    <!-- 导航栏开始 -->
    <van-tabs v-model="activeName" title-active-color="red" line-width="14px" line-height="3px">
      <van-tab title="待上课" name="a">
        <div class="jbn_toLogin" v-if="show==false">
          <div>
            <img src="../assets/nomsg_03.jpg" alt />
          </div>
          <p class="jbn_toast">还没有待上课记录哦</p>
          <p class="jbn_btn">
            <button @click="goYi">立即约课</button>
          </p>
        </div>
      </van-tab>
      <van-tab title="已上课" name="b">
        <div class="jbn_toLogin" v-if="show==false">
          <div>
            <img src="../assets/nomsg_03.jpg" alt />
          </div>
          <p class="jbn_toast">还没有上课记录哦</p>
          <p class="jbn_btn">
            <button @click="goYi">立即约课</button>
          </p>
        </div>
      </van-tab>
      <van-tab title="已取消" name="c">
        <div class="jbn_toLogin" v-if="show==false">
          <div>
            <img src="../assets/nomsg_03.jpg" alt />
          </div>
          <p class="jbn_toast">还没有取消上课记录哦</p>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 导航栏结束 -->
    <!-- 登录开始 -->
    <div class="jbn_toLogin" v-if="show==!show">
      <div>
        <img src="../assets/nomsg_03.jpg" alt />
      </div>
      <p class="jbn_toast">请登录后查看相关内容</p>
      <p class="jbn_btn">
        <button @click="toLogin">登录/注册</button>
      </p>
    </div>
    <!-- 登录结束 -->
    <!--  -->
    <Email></Email>
  </div>
</template>

<script>
import Email from "@/components/email";
export default {
  data() {
    return {
      activeName: "a",
      show: false
    };
  },
  created() {},
  mounted() {
    this.getToken();
  },
  methods: {
    //   判断是否登录
    getToken() {
      let token = localStorage.getItem("token");
      console.log(token);
      if (token == null) {
        this.show = false;
      }
    },
    // 点击登录按钮进入登录页面
    toLogin() {
      this.$router.push({
        path: "/relogin"
      });
    },
    // 点击立即约课进入一对一辅导页面
    goYi(){
      this.$router.push({
        path:"/yi"
      })
    }
  },
  components: {
    Email
  }
};
</script>

<style scoped lang="scss">
.jbn_content {
  height: 100%;
  background: #f0f2f5;
}
.van-nav-bar {
  width: 100%;
  height: 88px;
}
/deep/.van-tabs {
  height: 88px;
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
.jbn_toLogin {
  width: 100%;
  height: 995px;
  background: #f0f1f5;
  padding: 204px 198px 370px;
  box-sizing: border-box;
  img {
    width: 357px;
    height: 258px;
  }
}
.jbn_toast {
  color: #b2b3b7;
  font-size: 26px;
}
.jbn_btn {
  text-align: center;
  button {
    padding: 15px 30px;
    border: none;
    background: #d46a35;
    border-radius: 3px;
    color: #fff;
    font-size: 24px;
  }
}
</style>
