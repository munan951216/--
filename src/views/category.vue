<template>
  <div class="jbn_content">
    <div class="jbn_bg"></div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" color="#fff"></van-icon>
      <span>讲师详情</span>
      <span></span>
    </p>
    <div class="jbn_teacher">
      <div class="jbn_box">
        <div class="jbn_xq">
          <img :src="teacher.avatar" alt />
          <div>
            <p>
              <span>{{teacher.teacher_name}}</span>
              <span>{{teacher.level_name}}</span>
            </p>
            <span>
              {{ teacher.sex==0?'男':'女'}}
              {{ teacher.teach_age}}年教龄
            </span>
          </div>
          <button @click="getCollect" v-if="flag==2">关注</button>
          <button @click="getCollect" v-else>已关注</button>
        </div>
        <ul>
          <li v-for="(item,index) in commList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <van-tabs title-active-color="red" line-width="34px" line-height="3px">
      <van-tab title="讲师介绍" name="a">
        <div class="jbn_cate" >
          <!-- <p class="jbn_teacher_age">
            <span>{{teacher_age.attr_name}}</span>
            <span>{{teacher_age.attr_value[0].attr_value_name}}</span>
          </p> -->
          <p class="jbn_teacher_age" v-for="(item,index) in teacherInfo" :key="index">
            <span>
              {{ item.attr_name}}
            </span>
            <span v-for="(val,i) in item.attr_value" :key="i">
              {{val.attr_value_name}}
            </span>
          </p>
          <!-- <p>
            <span>{{teacher_name.attr_name}}</span>
            <span>{{teacher_name.attr_value[0].attr_value_name}}</span>
          </p> -->
          <p class="jbn_gory">
            <span>老师简介</span>
            <span>{{cate}}</span>
          </p>
        </div>
      </van-tab>
      <van-tab title="主讲课程" name="b">
        <div class="jbn_class">
          <ul>
            <li v-for="(item,index) in mainCouse" :key="index" @click="goClassCategory(item.id)">
              <p class="jbn_tit">{{ item.title}}</p>
              <p class="jbn_periods">共{{item.total_periods}}课时</p>
              <p v-for="(val,index) in item.teachers_list" :key="index" class="jbn_tea">
                <img :src="val.teacher_avatar" alt />
                <span>{{ val.teacher_name}}</span>
              </p>
              <div>
                <span>{{ item.sales_num}}人已报名</span>
                <span v-if="item.price==0">{{ item.price==0?"免费":`${ item.price/100}.00`}}</span>
                <span v-else style="color:#d02221">
                  <img
                    src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                    alt
                  />
                  {{ item.price==0?"免费":`${ item.price/100}.00`}}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="学员评价" name="c">
        <div class="jbn_com" v-if="comment.length==0">
          <img src="../assets/quan_03.jpg" alt />
          <p>暂无评论</p>
        </div>
        <!-- 讲师评价 -->
        <div v-else class="jbn_comment">
          <ul>
            <li v-for="(item,index) in comment" :key="index">
              {{item.title}}
              ({{ item.count}})
            </li>
          </ul>
          <div class="jbn_studyComment" v-for="(item,index) in studyComment" :key="index">
            <img :src="item.avatar" alt />
            <div class="jbn_right">
              <van-rate
                v-model="item.grade"
                :size="20"
                color="#ea782e "
                void-icon="star"
                void-color="#eee"
              />
              <ul class="jbn_pj">
                <li v-for="(item,index) in comment" :key="index">{{item.title}}</li>
              </ul>
              <p>{{ item.content}}</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <p class="jbn_btn">
      <button @click="goApp(teacher.id)">立即预约</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      teacher: [], //讲师信息
      teacher_age: [], //教学年龄
      teacher_name: [], //授课价格
      cate: [], //讲师详情
      mainCouse: [], //主讲课程
      comment: [], //讲师评价
      activeNames: 1,
      studyComment: [], //学生给老师的评价
      commList: [],
      flag:"", //关注状态
      teacherInfo:[]
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getTeacher();
    this.getTeacherCate();
    this.getClass();
    this.getComment();
  },
  methods: {
    //   点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取教师列表数据
    getTeacher() {
      this.$axios({
        url: `https://www.365msmk.com/api/app/teacher/${this.id}`,
        headers: {
          devicetype: "H5"
        }
      }).then(res => {
        console.log(res);
        this.teacher = res.data.data.teacher;
        this.commList = this.teacher.tag_content;
      });
    },
    // 获取老师详情
    getTeacherCate() {
      this.$axios({
        url: `https://www.365msmk.com/api/app/teacher/info/${this.id}`,
        headers: {
          devicetype: "H5"
        }
      }).then(res => {
        this.cate = res.data.data.intro;
        console.log(res);
        this.teacherInfo=res.data.data.attr
        console.log(this.teacherInfo)
        // this.teacher_age = res.data.data.attr[0];
        // this.teacher_name = res.data.data.attr[1];
        // console.log(this.teacher_name)
      });
    },
    // 获取主讲课程
    getClass() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/teacher/mainCourse/",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          teacher_id: this.id,
          limit: 10,
          page: 1
        },
        method: "POST"
      }).then(res => {
        this.mainCouse = res.data.data.list;
        // console.log(this.mainCouse);
      });
    },
    // 获取讲师评价
    getComment() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/teacher/comment",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          teacher_id: this.id,
          limit: 10,
          page: 1
        },
        method: "POST"
      }).then(res => {
        this.comment = res.data.data.tag;
        this.studyComment = res.data.data.comment.list;
      });
    },
    // 点击关注进行关注
    getCollect(){
      let token = localStorage.getItem("token");
      this.$axios({
        url:`https://www.365msmk.com/api/app/teacher/collect/${this.id}?`,
         headers: {
          devicetype: "H5",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then(res=>{
        // console.log(res)
        this.flag=res.data.data.flag
        console.log(this.flag)
        this.getFindCollect()
      })
    },
    getFindCollect(){
      let token = localStorage.getItem("token");
      this.$axios({
        url:`https://www.365msmk.com/api/app/teacher/${this.id}?`,
         headers: {
          devicetype: "H5",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then(res=>{
        this.flag=res.data.data.flag
        console.log(this.flag)
      })
    },
    // 点击进入课程详情页面
    goClassCategory(id){
      this.$router.push({
        path:"/classCategory",
        query:{
          id:id
        }
      })
    },
    // 点击立即预约
    goApp(id){
      this.$router.push({
        path:"/appoint",
        query:{
          id:id
        }
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
.jbn_bg {
  width: 100%;
  height: 200px;
  background: #5084e6;
  position: absolute;
  top: 0px;
  left: 0px;
}
.jbn_nav {
  width: 100%;
  height: 88px;
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 30px;
  align-items: center;
  color: #fff;
  position: relative;
  z-index: 999;
}
.jbn_teacher {
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 222;
  // background: red;
  .jbn_box {
    width: 710px;
    padding: 40px 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    .jbn_xq {
      display: flex;
      justify-content: space-between;
      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
      }
      > div {
        display: flex;
        flex-direction: column;
        // padding-left: 20px;
        height: 70px;
        justify-content: space-between;
        width: 404px;
        p {
          span:nth-of-type(1) {
            font-size: 30px;
            color: #727272;
          }
          span:nth-of-type(2) {
            font-size: 18px;
            color: #ea772a;
          }
        }
        span {
          color: #bbbbbb;
          font-size: 24px;
        }
      }
      button {
        width: 128px;
        height: 60px;
        background: #ebeefe;
        border: none;
        border-radius: 24px;
        color: #eb680c;
        font-size: 26px;
      }
    }
    ul{
      display:flex;
      justify-content: space-between;
      margin-top:36px;
      li{
        width:150px;
        height:50px;
        background: #ffe4d3;
        font-size:26px;
        color:#e98249;
        line-height:50px;
        text-align:center;
        border-radius:20px;
      }
    }
  }
}
// .jbn_teacher {
//   width: 100%;
//   // height: 180px;
//   padding: 0px 20px;
//   box-sizing: border-box;
//   position: relative;
//   z-index: 222;
//   > div {
//     width: 710px;
//     height: 180px;
//     background: #fff;
//     border-radius: 5px;
//     padding: 36px 30px 0px;
//     box-sizing: border-box;
//     justify-content: space-between;
//     display: flex;
//     img {
//       width: 80px;
//       height: 80px;
//       border-radius: 50%;
//     }
//     > div {
//       display: flex;
//       flex-direction: column;
//       // padding-left: 20px;
//       height: 70px;
//       justify-content: space-between;
//       width: 404px;
//       p {
//         span:nth-of-type(1) {
//           font-size: 30px;
//           color: #727272;
//         }
//         span:nth-of-type(2) {
//           font-size: 18px;
//           color: #ea772a;
//         }
//       }
//       span {
//         color: #bbbbbb;
//         font-size: 24px;
//       }
//     }
//     button {
//       width: 128px;
//       height: 60px;
//       background: #ebeefe;
//       border: none;
//       border-radius: 24px;
//       color: #eb680c;
//       font-size: 26px;
//     }
//   }
// }
/deep/.van-tabs {
  height: 88px;
  margin-top: 20px;
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
.jbn_cate {
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: #fff;
  p {
    color: #898989;
    font-size: 26px;
    margin-bottom: 70px;
  }
}
.jbn_gory {
  line-height: 60px;
}
.jbn_btn {
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  button {
    width: 100%;
    height: 100%;
    background: #eb6100;
    color: #fff;
    border-radius: 10px;
    border: none;
  }
}
.jbn_class {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  margin-bottom: 90px;
  background: #f0f2f5;
  ul {
    li {
      background: #fff;
      margin-bottom: 30px;
      padding: 30px 25px;
      box-sizing: border-box;
      border-radius: 6px;
      .jbn_tit {
        font-weight: bold;
        font-size: 30px;
      }
      .jbn_periods {
        color: #696969;
        font-size: 22px;
      }
      .jbn_tea {
        height: 55px;
        display: flex;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
        }
        span {
          color: #838383;
          font-size: 24px;
          margin-left: 16px;
        }
      }
      div {
        width: 100%;
        height: 58px;
        padding: 28px 0px 0px 0px;
        box-sizing: border-box;
        border-top: 2px solid #f2f2f2;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          color: #7d7d7d;
          font-size: 24px;
        }
        span:nth-of-type(2) {
          color: #6a9352;
          img {
            width: 25px;
            height: 25px;
          }
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
.jbn_comment {
  width: 100%;
  padding: 42px 30px;
  box-sizing: border-box;
  background: #fff;
  > ul {
    display: flex;
    width: 605px;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 178px;
      height: 48px;
      border: 2px solid #ed8c4b;
      color: #e86624;
      text-align: center;
      line-height: 48px;
      font-size: 26px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
}
.jbn_studyComment {
  width: 100%;
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .jbn_right {
    padding-left: 20px;
  }
  .jbn_pj {
    width: 565px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 170px;
      height: 46px;
      background: #f5f5f5;
      color: #918a89;
      line-height: 46px;
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
      border-radius: 6px;
    }
  }
  p {
    color: #abb6bc;
    font-size: 26px;
  }
}
</style>
