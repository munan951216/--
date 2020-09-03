<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>找回密码</span>
      <span></span>
    </p>
    <div class="jbn_filed">
      <!-- 输入手机号 -->
      <p>
        <input type="text" placeholder="请输入手机号" v-model="mobile" />
        <span @click="getSms">获取验证码</span>
      </p>
      <p>
        <input type="text" placeholder="请输入短信验证码" v-model="sms" />
      </p>
      <p>
        <input type="password" placeholder="请输入密码" v-model="pass" />
      </p>
      <p class="jbn_btn">
        <button class="jbn_login" >确定</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      sms: "",
      pass:""
    };
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
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  border-bottom: 2px solid #f4f4f4;
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
.jbn_btn{
    margin-top:70px;
}
</style>
