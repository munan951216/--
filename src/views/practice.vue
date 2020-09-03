<template>
  <div class="jbn_content">
    <p class="jbn_bar">练习</p>
    <div class="jbn_nav">
      <ul>
        <li @click="goExamination">
          <p>
            <img src="../assets/kao.png" alt />
          </p>
          <p class="jbn_txt">考点专练</p>
        </li>
        <li @click="goRoll">
          <p>
            <img src="../assets/juan.png" alt />
          </p>
          <p class="jbn_txt">套卷练习</p>
        </li>
        <li @click="goTest">
          <p>
            <img src="../assets/fang.png" alt />
          </p>
          <p class="jbn_txt">仿真模考</p>
        </li>
        <li @click="goErr">
          <p>
            <img src="../assets/cuo.png" alt />
          </p>
          <p class="jbn_txt">错题练习</p>
        </li>
        <li @click="goEva">
          <p>
            <img src="../assets/ce.png" alt />
          </p>
          <p class="jbn_txt">测评记录</p>
        </li>
        <li @click="goStar">
          <p>
            <img src="../assets/shou.png" alt />
          </p>
          <p class="jbn_txt">习题收藏</p>
        </li>
      </ul>
    </div>
    <!-- 近期模考开始 -->
    <div class="jbn_kao">
      <p>近期模考</p>
      <p>
        <span>默认排序</span>
        <span>时间</span>
      </p>
      <p class="jbn_img">
        <img src="../assets/wu_03.jpg" alt />
      </p>
      <p>暂无模考安排，敬请期待</p>
    </div>
    <!-- 近期模考结束 -->
    <Email></Email>
  </div>
</template>

<script>
import Email from "@/components/email";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //点击考点专练进入考试页面
    goExamination() {
        this.$router.push({
            path:"/examination"
        })
    },
    // 点击套卷练习进入套卷练习页面
    goRoll(){
      this.$router.push({
        path:"/roll"
      })
    },
    // 点击仿真模考进入模考页面
    goTest(){
      this.$router.push({
        path:"/test"
      })
    },
    goErr(){
      this.$router.push({
        path:"/err"
      })
    },
    goEva(){
      this.$router.push({
        path:"/evaluation"
      })
    },
    goStar(){
      this.$router.push({
        path:"/start"
      })
    }
  },
  components: {
    Email
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.jbn_bar {
  width: 100%;
  height: 88px;
  text-align: center;
  line-height: 88px;
  font-size: 24px;
  font-weight: bold;
  background: #fff;
}
.jbn_content {
  height: 1180px;
  width: 100%;
  background: #f0f1f5;
}
.jbn_nav {
  width: 100%;
  height: 396px;
  padding: 20px;
  box-sizing: border-box;
  ul {
    width: 710px;
    height: 356px;
    background: #fff;
    display: flex;
    padding: 32px 0px;
    box-sizing: border-box;
    border-radius: 8px;
    flex-wrap: wrap;
    text-align: center;
    // justify-content: space-between;
    align-items: center;
    li {
      margin-right: 20px;
      margin-left: 20px;
    }
    p:nth-of-type(1) {
      width: 80px;
      height: 80px;
      // background: red;
      border-radius: 50%;
      padding: 25px;
      box-sizing: border-box;
      margin-left: 15px;
    }
    img {
      width: 40px;
      height: 40px;
    }
    .jbn_txt {
      color: #737373;
      font-size: 24px;
    }
  }
}
.jbn_kao {
  width: 100%;
  // height:480px;
  background: #fff;
  padding: 28px 30px;
  box-sizing: border-box;
  p:nth-of-type(1) {
    color: #848484;
    font-size: 28px;
  }
  p:nth-of-type(2) {
    width: 690px;
    display: flex;
    justify-content: space-between;
    padding: 30px 0px;
    span:nth-of-type(1) {
      color: #e25d05;
      font-size: 24px;
    }
    span:nth-of-type(2) {
      color: #999999;
      font-size: 24px;
    }
  }
  p:nth-of-type(4) {
    color: #8b8b8b;
    font-size: 24px;
    text-align: center;
  }
}
.jbn_img {
  width: 100%;
  height: 306px;
  padding: 0px 289px 30px;
  box-sizing: border-box;
  img {
    width: 175px;
    height: 237px;
  }
}
</style>
