<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>课程详情</span>
      <img src="../assets/share.png" alt @click="share" />
    </p>
    <!-- 课程详情开始 -->
    <div class="jbn_cate">
      <div>
        <p>{{cate.title}}</p>
        <p>
          <span v-if="cate.price==0">{{ cate.price==0?"免费":`${ cate.price/100}.00`}}</span>
          <span v-else style="color:#d02221">
            <img
              src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
              alt
            />
            {{ cate.price==0?"免费":`${ cate.price/100}.00`}}
          </span>
        </p>
        <p>
          <span>共{{cate.total_periods}}课时</span>
          |
          <span>{{ cate.sales_num}}</span>人已报名
        </p>
      </div>
      <van-icon name="star-o" size="18px" @click="goCollect(cate.id)" v-if="is_collect==0" />
      <van-icon name="star" v-else color="#eb6100" size="18px" @click="getCancel" />
    </div>
    <!-- 课程详情结束 -->
    <!-- 教学团队开始 -->
    <div class="jbn_teacherTrem">
      <h3>教学团队</h3>
      <p @click="goCategory(teacher[0].teacher_id)">
        <img :src="teacher[0].teacher_avatar" alt />
        <span>{{ teacher[0].teacher_name}}</span>
      </p>
    </div>
    <!-- 教学团队结束 -->
    <!-- 课程介绍部分开始 -->
    <div class="jbn_classInfo">
      <h3>课程介绍</h3>
      <p>{{ classInfo.periods_title}}</p>
    </div>
    <!-- 课程介绍部分结束 -->
    <!-- 课程大纲部分开始 -->
    <div class="jbn_classOutline">
      <h3>课程大纲</h3>
      <p @click="govideo(classInfo.video_id)">{{ classInfo.periods_title}}</p>
    </div>
    <!-- 课程大纲部分结束 -->
    <!-- 课程评论部分开始 -->
    <div class="jbn_classComment">
      <h3>课程评论</h3>
      <div class="jbn_com" v-if="classComment.length==0">
        <img src="../assets/quan_03.jpg" alt />
        <p>暂无评论</p>
      </div>
      <ul v-else>
        <li v-for="(item,index) in classComment" :key="index">
          <img :src="item.avatar" alt />
          <div>
            <p>
              <span>{{item.nickname}}</span>
              <van-rate
                v-model="item.grade"
                :size="15"
                color="#ea782e "
                void-icon="star"
                void-color="#eee"
              />
            </p>
            <p>{{item.content}}</p>
          </div>
          <p>{{item.created_at | dataTime2}}</p>
        </li>
      </ul>
    </div>
    <!-- 课程评论部分结束 -->
    <p class="jbn_btn">
      <button @click="downOrder(cate.id)" v-if="cate.is_buy==0">立即报名</button>
      <button v-else @click="tostudy(cate.id)">立即学习</button>
    </p>
    <!-- 二维码弹出层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p>分享</p>
          <div>
            <img :src="imgUrl" alt="">
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import QRCode from "qrcode"
export default {
  data() {
    return {
      id: "",
      cate: [], //课程详情
      teacher: [], //教学团队
      classInfo: [], //课程介绍
      classComment: [], //课程评价
      collect: "",
      is_collect: "",
      collectData: "",
      show: false,
      hid:true,
      imgUrl:''
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.getClassCate();
    this.getCourse();
    this.getComment();
  },
  methods: {
    //   点击返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //   获取课程详情
    getClassCate() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/courseInfo/basis_id=${this.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        this.cate = res.data.data.info;
        this.teacher = res.data.data.teachers;
        this.collect = res.data.data.info.collect_id;
        this.is_collect = res.data.data.info.is_collect;
      });
    },
    // 获取课程介绍
    getCourse() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/courseChapter",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          id: this.id,
          courseType: 5
        }
      }).then(res => {
        this.classInfo = res.data.data[0];
        // console.log(this.classInfo);
      });
    },
    // 获取课程评价
    getComment() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/courseComment",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          id: this.id,
          page: 1,
          limit: 15,
          total: 3
        }
      }).then(res => {
        this.classComment = res.data.data.list;
        // console.log(this.classComment);
      });
    },
    // 点击课程大纲播放视频
    govideo(v_id) {
      let token = localStorage.getItem("token");
      // console.log(v_id)
      this.$axios({
        url: `https://www.365msmk.com/api/app/getPlayToken/video_id=${v_id}/course_id=${this.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.$toast(res.data.msg);
      });
    },
    // 课程收藏
    goCollect(id) {
      // console.log(id)
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/collect",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          course_basis_id: id,
          type: 1
        },
        method: "POST"
      }).then(res => {
        this.getClassCate();
        this.collectData = res.data.data;
        console.log(res);
        this.$toast.success("收藏成功");
      });
    },
    // 取消收藏
    getCancel(id) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/collect/cancel/${this.collectData}/${this.is_collect}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        this.getClassCate();
        this.$toast("取消收藏");
      });
    },
    // 点击教学团队进入老师详情
    goCategory(id) {
      this.$router.push({
        path: "/category",
        query: {
          id: id
        }
      });
    },
    // 点击立即报名
    downOrder(id) {
      let token = localStorage.getItem("token");
      // console.log(id)
      this.$axios({
        url: "https://www.365msmk.com/api/app/order/downOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          shop_id: id,
          type: 3
        }
      }).then(res => {
        // console.log(res);
        this.$toast(res.data.msg)
        this.getClassCate();
      });
    },
    // 点击立即学习进入学习页面
    tostudy(id) {
      // console.log(id)
      this.$router.push({
        path: "/tostudy",
        query:{
          id:id
        }
      });
    },
    // 点击分享
    share() {
      // console.log(123);
      this.show=true
      let url=location.href
      // console.log(url)
      QRCode.toDataURL(url).then(res=>{
        console.log(res)
        this.imgUrl=res
      }).catch(err=>{
        console.error(err)
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
  background: #f0f2f5;
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
}
.jbn_cate {
  width: 100%;
  height: 270px;
  padding: 36px 28px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin-top: 88px;
  div {
    width: 590px;
    p:nth-of-type(1) {
      font-size: 34px;
      color: #868686;
    }
    p:nth-of-type(2) {
      color: #ed7119;
      margin-top: 15px;
      font-size: 34px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    p:nth-of-type(3) {
      color: #a09e9a;
      margin-top: 20px;
    }
  }
}
.jbn_teacherTrem {
  width: 100%;
  height: 290px;
  margin-top: 30px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #fff;
  h3 {
    font-size: 30px;
    color: #423a3b;
  }
  p {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    margin-top: 36px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    span {
      font-size: 24px;
      color: #737374;
    }
  }
}
.jbn_classInfo {
  width: 100%;
  height: 155px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 30px;
  h3 {
    font-size: 30px;
    color: #413e3a;
  }
  p {
    font-size: 26px;
    color: #202223;
    text-indent: 12px;
    margin-top: 26px;
  }
}
.jbn_classOutline {
  width: 100%;
  height: 236px;
  margin-top: 30px;
  background: #fff;
  padding: 30px 20px;
  box-sizing: border-box;
  p {
    font-size: 26px;
    color: #202223;
    text-indent: 78px;
    margin-top: 26px;
  }
}
.jbn_btn {
  width: 100%;
  height: 86px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  button {
    width: 100%;
    height: 100%;
    background: #eb6100;
    border: none;
    color: #fff;
  }
}
.jbn_classComment {
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 96px;
  margin-top: 30px;
  ul {
    width: 710px;
    padding: 20px 20px;
    box-sizing: border-box;
    li {
      display: flex;
      height: 100px;
      justify-content: space-between;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      div {
        // width: 370px;
        font-size: 24px;
        text-align: left;
        p:nth-of-type(1) {
          display: flex;
        }
        p:nth-of-type(2) {
          color: #9f9b9a;
        }
      }
    }
  }
}
.jbn_com {
  width: 100%;
  height: 422px;
  padding: 26px 220px;
  box-sizing: border-box;
  margin-top: 30px;
  background: #fff;
  img {
    width: 300px;
    height: 300px;
  }
  p {
    font-size: 28px;
    color: #90969f;
    text-align: center;
    padding-top: 40px;
  }
}
/deep/ .van-overlay{
  width:100%;
  height:100%;
  padding:285px 110px;
  box-sizing: border-box;
  .block{
    width:525px;
    height:525px;
    background: #fff;
    padding:30px 80px;
    box-sizing: border-box;
    p{
      text-align:center;
      color:#787878;
      font-size:34px;
    }
  }
}
</style>
