<template>
  <div>
    <van-nav-bar title="设置密码" right-text="跳过" @click-right="onClickRight" />
    <p>
      <input type="text" placeholder="请设置登录密码" v-model="pass" />
    </p>
    <p>
      <input type="text" placeholder="请再次输入密码" v-model="repass" />
    </p>
    <p class="jbn_btn">
    <button>确定</button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pass: "", //密码
      repass: "" //确认密码
    };
  },
  created() {},
  mounted() {},
  methods: {
    onClickRight() {
      this.$router.push("/info");
    }
  }
};
</script>
<style scoped lang="scss">
.van-nav-bar {
  height: 100px;
}
p {
  width: 100%;
  padding: 0px 40px;
  box-sizing: border-box;
  input {
    width: 670px;
    border-bottom: 2px solid #f0f0f0;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 100px;
  }
}
.jbn_btn {
  padding: 0px 70px;
  box-sizing: border-box;
  margin-top: 118px;
}
button {
  width: 620px;
  height: 90px;
  border-radius: 40px;
  border: none;
  color: #fff;
  background: -webkit-linear-gradient(left, orange, orangered);
}
</style>
