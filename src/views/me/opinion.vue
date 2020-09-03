<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>意见反馈</span>
      <span></span>
    </p>
    <p class="jbn_txt">
      <textarea type="text" placeholder="请输入您的意见"></textarea>
      <span>0/500</span>
    </p>
    <p class="jbn_btn">
        <button>提交</button>
    </p>
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
    // 返回上一个页面
    goBack() {
      this.$router.go(-1);
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
}
.jbn_txt {
  width: 100%;
  height: 430px;
  padding: 30px;
  box-sizing: border-box;
  span{
      float: right;
      color:#c6c6c6;
      font-size:24px;
  }
  textarea {
    width: 690px;
    height: 330px;
    border: 4px solid #ebebeb;
    border-radius: 10px;
    text-indent: 16px;
    &::placeholder {
      font-size: 26px;
      color: #b7b7b7;
    }
  }
}
.jbn_btn{
    width:100%;
    padding:0px 30px;
    box-sizing: border-box;
    margin-top:198px;
    button{
        width:690px;
        height:90px;
        background: #eb6100;
        border:none;
        border-radius:10px;
        color:#fff;
        font-size:36px;
    }
}
</style>
