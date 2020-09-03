<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>{{ classCourse.title}}</span>
      <van-icon name="calender-o" size="25"></van-icon>
    </p>
    <!-- 进度条部分开始 -->
    <div class="jbn_progress">
      <span>共{{classCourse.section_num}}课时</span>
      <p>
        <van-progress inactive :percentage="progress" pivot-text stroke-width="5px" />
      </p>
      <span>已学习{{classCourse.progress_rate}}%</span>
    </div>
    <!-- 进度条部分结束 -->
    <!-- 内容区域开始 -->
    <div class="jbn_content">
      <div v-for="(item,index) in periods" :key="index" @click="goVideo(item.video_id)">
        <p>
          <span class="jbn_dis"></span>
          <span>[回放]</span>
          <span>{{ item.periods_title}}</span>
        </p>
        <p>
          <span>{{classCourse.teacher_name}}</span>
          <span>{{item.start_play}}-{{item.end_play}}</span>
        </p>
        <p>
          <van-progress inactive :percentage="item.progress_rate" pivot-text stroke-width="5px" />
          <span>
            已观看
            {{item.progress_rate}}%
          </span>
        </p>
      </div>
    </div>
    <!-- 内容区域结束 -->
    <!-- 底部列表开始 -->
    <ul class="jbn_footer">
      <li @click="goPing">
        <van-icon name="edit" color="#999598"></van-icon>
        <span>写评论</span>
      </li>
      <li @click="goBack">
        <van-icon name="qr" color="#999598"></van-icon>
        <span>课程详情</span>
      </li>
      <li>
        <van-icon name="delete" color="#999598"></van-icon>
        <span>移除列表</span>
      </li>
    </ul>
    <!-- 底部列表结束 -->
    <!-- 写评论遮盖层开始 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p>
            星级：
            <van-rate v-model="value" color="#ea792e" size="20px" />
          </p>
          <p>
            <span>内容：</span>
            <textarea v-model="txt"></textarea>
          </p>
          <p>
            <button @click="addComment(classCourse.course_id)">发布</button>
          </p>
        </div>
      </div>
    </van-overlay>
    <!-- 写评论遮盖层结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      classCourse: [],
      progress: "",
      periods: [],
      show: false,
      value: 5,
      txt: ""
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getClass();
  },
  methods: {
    //   点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取信息
    getClass() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/myStudy/course/${this.id}?`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.classCourse = res.data.data.course;
        this.progress = res.data.data.course.progress_rate;
        this.periods = res.data.data.periods;
        console.log(this.periods);
        console.log(this.classCourse);
      });
    },
    // 点击视频进入视频学习页面
    goVideo(video_id, id, title) {
      this.$router.push({
        path: "/video",
        query: {
          video_id: video_id,
          id: this.id,
          title: this.classCourse.title
        }
      });
    },
    // 点击写评论
    goPing() {
      this.show = true;
    },
    addComment(id) {
      // console.log(id)
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myStudy/comment",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        params: {
          grade: this.value,
          content:this.txt ,
          course_id: id,
          type: 1
        }
      }).then(res=>{
        console.log(res)
        this.$toast(res.data.msg)
        this.show=false
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
.jbn_content {
  width: 100%;
  height: 100%;
  // background: #f0f2f5;
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
  color: #a0a0a0;
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  img {
    width: 30px;
    height: 36px;
  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 470px;
  }
}
.jbn_progress {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  height: 110px;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
  margin-top: 88px;
  p {
    width: 55%;
  }
  span {
    font-size: 28px;
    color: #595959;
  }
}
.jbn_content {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 82px;
  > div {
    width: 690px;
    height: 190px;
    border: 5px solid #eaeaea;
    border-radius: 7px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p:nth-of-type(1) {
      display: flex;
      span:nth-of-type(1) {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #eb5b00;
        display: block;
      }
      span:nth-of-type(2) {
        color: #eb5b00;
        font-size: 26px;
        margin-left: 20px;
      }
      span:nth-of-type(3) {
        color: #6c6969;
        font-size: 26px;
        margin-left: 10px;
      }
    }
    p:nth-of-type(2) {
      color: #90969f;
      text-indent: 30px;
      span:nth-of-type(2) {
        margin-left: 20px;
      }
    }
    p:nth-of-type(3) {
      display: flex;
      align-items: center;
      color: #9e9e9e;
      justify-content: space-between;
      /deep/ .van-progress {
        width: 465px;
      }
    }
  }
}
.jbn_footer {
  width: 100%;
  display: flex;
  height: 72px;
  border-top: 5px solid #e5e5e6;
  border-bottom: 5px solid #e5e5e6;
  justify-content: space-around;
  align-items: center;
  color: #999598;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background: #fff;
}
/deep/ .van-overlay {
  width: 100%;
  height: 100%;
  padding: 325px 20px;
  box-sizing: border-box;
  .block {
    width: 710px;
    height: 510px;
    background: #fff;
    border-radius: 10px;
    padding: 70px 40px;
    box-sizing: border-box;
    p:nth-of-type(1) {
      color: #8c8c8c;
      font-size: 26px;
    }
    p:nth-of-type(2) {
      margin-top: 70px;
      display: flex;
      textarea {
        width: 535px;
        height: 155px;
        border: 3px solid #dddddd;
        border-radius: 10px;
      }
    }
    p:nth-of-type(3) {
      text-align: center;
      margin-top: 50px;
      button {
        width: 180px;
        height: 60px;
        background: #eb6100;
        border: none;
        color: #fff;
        border-radius: 10px;
      }
    }
  }
}
</style>
