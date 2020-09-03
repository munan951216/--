<template>
  <div class="jbn_content">
    <div class="jbn_bg"></div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" color="#fff"></van-icon>
      <span>预约课程</span>
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
          <button @click="goCategory(teacher.id)">查看详情</button>
        </div>
        <ul>
          <li v-for="(item,index) in commList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="jbn_time">
      <p>
        选择时间
        <span>（北京时间）</span>
      </p>
    </div>
    <!-- 日期选择开始 -->
    <div class="jbn_timeDate">
      <div class="jbn_data">
        <p>
          <span>周一</span>
          <span>08/24</span>
        </p>
        <p>
          <span>周二</span>
          <span>08/25</span>
        </p>
        <p>
          <span>周三</span>
          <span>08/26</span>
        </p>
        <p>
          <span>周四</span>
          <span>08/27</span>
        </p>
        <p>
          <span>周五</span>
          <span>08/28</span>
        </p>
        <p>
          <span>周六</span>
          <span>08/29</span>
        </p>
        <p>
          <span>周日</span>
          <span>08/30</span>
        </p>
        <p>
          <span>周一</span>
          <span>08/31</span>
        </p>
          <p>
          <span>周二</span>
          <span>09/01</span>
        </p>
        <p>
          <span>周三</span>
          <span>09/02</span>
        </p>
        <p>
          <span>周四</span>
          <span>09/03</span>
        </p>
        <p>
          <span>周五</span>
          <span>09/04</span>
        </p>
        <p>
          <span>周六</span>
          <span>09/05</span>
        </p>
        <p>
          <span>周日</span>
          <span>09/06</span>
        </p>
      </div>
    </div>
    <!-- 日期选择结束 -->
    <!-- 信息部分开始 -->
    <div class="jbn_info">
      <img src="../assets/empty.png" alt="">
      <p>暂无信息</p>
    </div>
    <!-- 信息部分结束 -->
    <!-- 立即预约按钮 -->
    <p class="jbn_btn">
      <button>立即预约</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      teacher: [], //讲师信息
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getTeacher();
  },
  methods: {
    //  点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取讲师详情
    getTeacher() {
      this.$axios({
        url: `https://www.365msmk.com/api/app/teacher/${this.id}`,
        headers: {
          devicetype: "H5"
        }
      }).then(res => {
        // console.log(res);
        this.teacher = res.data.data.teacher;
        this.commList = this.teacher.tag_content;
        console.log(this.teacher)
      });
    },
    // 点击进入老师详情页面
    goCategory(id){
      this.$router.push({
        path:"/category",
        query:{
          id:id
        }
      })
    },
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
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 36px;
      li {
        width: 150px;
        height: 50px;
        background: #ffe4d3;
        font-size: 26px;
        color: #e98249;
        line-height: 50px;
        text-align: center;
        border-radius: 20px;
      }
    }
  }
}
.jbn_time {
  width: 100%;
  padding: 30px 25px;
  box-sizing: border-box;
  p {
    text-indent: 20px;
    border-left: 8px solid #eb5600;
    font-size: 30px;
    color: #727273;
    span {
      font-size: 26px;
    }
  }
}
.jbn_timeDate{
  width:100%;
  padding:0px 20px;
  box-sizing: border-box;
  .jbn_data{
    width:710px;
    background: #fff;
    height:146px;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    padding:20px;
    box-sizing: border-box;
    p{
      display: flex;
      flex-direction:column;
      text-align:center;
      font-size:26px;
      color:#bfbfbf;
      border-bottom:3px solid #f5f5f5;
      line-height:40px;
      width:108px;
    }
  }
}
.jbn_info{
  width:100%;
  padding:30px 220px;
  box-sizing: border-box;
  margin-bottom: 86px;

  img{
    width:310px;
    height:310px;
  }
  p{
    text-align:center;
    color:#a19d96;
    margin-top:20px;
    font-size:28px;
  }
}
.jbn_btn{
  width:100%;
  height:86px;
  position: fixed;
  left:0px;
  bottom:0px;
  button{
    width:100%;
    height:86px;
    border:none;
    background: #eb6100;
    color:#fff;
    font-size:36px;
  }
}
</style>
