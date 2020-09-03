<template>
  <div>
    <div class="jbn_logo">
      <img
        src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
        alt
      />
    </div>
    <div class="jbn_filed" v-if="show">
      <!-- 输入手机号 -->
      <p>
        <input type="text" placeholder="请输入手机号" v-model="mobile" />
        <span @click="getSms">获取验证码</span>
      </p>
      <p>
        <input type="text" placeholder="请输入短信验证码" v-model="sms" />
      </p>
      <p>
        <span>*未注册的手机号将自动注册</span>
        <span @click="check">使用密码登录</span>
      </p>
      <p class="jbn_btn">
        <button class="jbn_login" @click="goLogin">登录</button>
      </p>
    </div>
    <div class="jbn_filed" v-if="!show">
      <!-- 输入手机号 -->
      <p>
        <input type="text" placeholder="请输入手机号" v-model="mobile" />
      </p>
      <p>
        <input type="password" placeholder="请输入密码" v-model="pass" />
      </p>
      <p>
        <span @click="goReset">找回密码</span>
        <span @click="check">注册/验证码登录</span>
      </p>
      <p class="jbn_btn">
        <button class="jbn_login" @click="goLogin2">登录</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true, //验证码登陆或密码登陆显示框
      mobile: "", //输入的手机号
      sms: "", //验证码
      pass: "" //密码
    };
  },
  created() {},
  mounted() {
    //   获取验证码
    this.getSms();
    //   验证码登陆
    this.goLogin();
  },
  methods: {
    //   切换验证码登陆或者密码登陆
    check() {
      this.show = !this.show;
      console.log(this.show);
    },
    // 获取验证码
    getSms() {
      this.$axios({
        url: "https://www.365msmk.com/api/app/smsCode",
        method: "POST",
        params: {
          mobile: this.mobile,
          sms_type: "login"
        }
      }).then(res => {
        var mobile = this.mobile;
        console.log(res);
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile)) {
          this.$toast(res.data.msg);
          return false;
        }
      });
    },
    // 点击登录按钮进行验证码登录
    goLogin() {
      this.$axios({
        url: "https://www.365msmk.com/api/app/login",
        method: "POST",
        params: {
          mobile: this.mobile,
          sms_code: this.sms,
          type: 2
        }
      }).then(res => {
        if (res.data.code == 200) {
          // 登录成功跳转到我的信息页面
          this.$toast(res.data.msg);
          this.$router.push("/setpass");
        }
        // 获取token值
        localStorage.setItem("token", res.data.data.remember_token);
        // 调用获取信息
        this.getUserInfo();
      });
    },
    // 点击登录按钮进行密码登录
    goLogin2(){
      this.$axios({
        url:"https://www.365msmk.com/api/app/login",
        method:"POST",
        params: {
          mobile: this.mobile,
          password:this.pass,
          type: 1
        }
      }).then(res=>{
        console.log(res)
        if(res.data.code==200){
          this.$router.push("/me");
        }
        localStorage.setItem("token", res.data.data.remember_token);
      })
    },
    // 获取用户信息
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
        console.log(res);
      });
    },
    goReset(){
      this.$router.push({
        path:"/resetpass"
      })
    }
  }
};
</script>

<style scoped lang="scss">
.jbn_logo {
  width: 100%;
  height: 320px;
  padding: 100px 140px 120px;
  box-sizing: border-box;
  img {
    width: 473px;
    height: 102px;
  }
}
.jbn_filed {
  width: 100%;
  height: 306px;
  padding: 36px 75px;
  box-sizing: border-box;
  p:nth-of-type(1) {
    width: 590px;
    position: relative;
    span {
      color: #eb6f33;
      position: absolute;
      right: 0px;
      top: 30px;
    }
  }
  p:nth-of-type(3) {
    width: 590px;
    display: flex;
    justify-content: space-between;
    span:nth-of-type(1) {
      width: 360px;
      color: #a4a4a4;
      font-size: 24px;
    }
    span:nth-of-type(2) {
      width: 150px;
      color: #a4a4a4;
      font-size: 24px;
    }
  }
  input {
    border-bottom: 1px solid #f0f0f0;
    width: 590px;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 100px;
  }
}
.jbn_login {
  width: 612px;
  height: 90px;
  border-radius: 40px;
  background: -webkit-linear-gradient(left, orange, orangered);
  border: none;
  color: #fff;
}
// .jbn_btn {
//   width: 100%;
//   padding: 150px 65px;
//   box-sizing: border-box;
// }
</style>
