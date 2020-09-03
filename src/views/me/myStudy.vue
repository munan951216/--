<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>我的学习</span>
      <van-icon name="calender-o" size="25"></van-icon>
    </p>
    <!-- 标签栏开始 -->
    <van-tabs>
      <van-tab v-for="(item,index) in navList" :title="item.name+`(${item.num})`" :key="index">
        <!-- 我的课程列表部分开始 -->
        <div slot="title" @click="navToggle(item.type)">{{item.name+`(${item.num})`}}</div>
        <div class="jbn_class" v-if="classList.length>0">
          <div v-for="(item,index) in classList" :key="index" @click="tostudy(item.course_id)">
            <p>{{item.title}}</p>
            <p>
              <span>{{item.start_play_date | dataTime4}}~{{item.end_play_date | dataTime4}}</span> |
              <span>共{{item.section_num}}课时</span>
            </p>
            <p>
              <van-progress
                inactive
                :percentage="item.progress_rate"
                pivot-text
                stroke-width="5px"
              />
              <span>
                已学习
                {{item.progress_rate}}%
              </span>
            </p>
          </div>
        </div>
        <div class="jbn_empty" v-else>
          <img src="../../assets/empty.png" alt />
          <p>还没有课程，快去选择课程学习吧</p>
          <p>
            <button @click="goClass">选择课程</button>
          </p>
        </div>
        <!-- 我的课程列表部分结束 -->
      </van-tab>
    </van-tabs>
    <!-- 标签栏结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [], //导航栏信息
      classList: [],
      type: 2,
      newClass: []
    };
  },
  created() {},
  mounted() {
    this.getTitle();
  },
  methods: {
    //点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取导航栏信息,我的学习
    getTitle() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/myStudy/${this.type}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res);
        this.navList = res.data.data.typeNum;
        this.classList = res.data.data.courseList;
        this.newClass = this.classList.filter(item => {
          return (item.type = this.type);
        });
      });
    },
    navToggle(type) {
      this.type = type;
      this.getTitle();
    },
    // 点击选择课程进入特色课页面
    goClass() {
      this.$router.push({
        path: "/class"
      });
    },
    tostudy(id) {
      console.log(id)
      this.$router.push({
        path: "/tostudy",
        query: {
          id: id
        }
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
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
}
/deep/ .van-tabs {
  height: 86px;
  margin-top: 88px;
}
/deep/ .van-tabs__wrap {
  height: 86px;
}
.jbn_class {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  > div {
    width: 690px;
    // height: 255px;
    border: 3px solid #f3f3f3;
    border-radius: 10px;
    padding: 45px 30px;
    box-sizing: border-box;
    margin-bottom: 30px;
    p:nth-of-type(1) {
      font-size: 34px;
      color: #4d4e4f;
    }
    p:nth-of-type(2) {
      color: #7b7b7b;
      font-size: 26px;
      margin-top: 20px;
    }
    p:nth-of-type(3) {
      display: flex;
      color: #9e9d9d;
      font-size: 26px;
      align-items: center;
      margin-top: 60px;

      span {
        margin-left: 20px;
      }
    }
  }
}
/deep/ .van-progress {
  width: 180px;
}
.jbn_empty {
  width: 100%;
  padding: 100px;
  box-sizing: border-box;
  text-align: center;
  img {
    width: 310px;
    height: 310px;
  }
  p:nth-of-type(1) {
    color: #7b7b7b;
    font-size: 34px;
    text-align: center;
    margin-top: 30px;
  }
  p:nth-of-type(2) {
    margin-top: 20px;
    button {
      background: #eb6100;
      color: #fff;
      border: none;
      width: 200px;
      height: 60px;
      border-radius: 10px;
    }
  }
}
</style>
