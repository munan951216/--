<template>
  <div class="jbn_content">
    <p class="jbn_set">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>设置</span>
      <span></span>
    </p>
    <div class="jbn_setting">
        <p>
            <span>设置密码</span>
            <van-icon name="arrow"></van-icon>
        </p>
        <button @click="outlogin">退出登录</button>
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
    // 点击返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 点击退出登录
    outlogin(){
        // 清空token
        localStorage.removeItem("token")
        this.$router.push({
            path:"/nav"
        })
        
    }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.jbn_set {
  width: 100%;
  height: 100px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  background: #fff;
}
.jbn_content{
    background: #f5f5f5;
    height:100%;
}
.jbn_setting{
    width:100%;
    height:425px;
    background: #fff;
    margin-top:20px;
    padding:50px 30px;
    box-sizing:border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    p{
        font-size: 26px;
        display:flex;
        justify-content: space-between;
    }
    button{
        width:690px;
        background: #eb6100;
        color:#fff;
        height:90px;
        border:none;
        border-radius:8px;
        font-size:32px;
    }
}
</style>
