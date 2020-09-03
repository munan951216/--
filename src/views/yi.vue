<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" color="#656565" @click="goBack"></van-icon>
      <span>一对一辅导</span>
      <van-icon name="search" color="#656565" @click="goSearch"></van-icon>
    </p>
    <van-dropdown-menu class="jbn_downList">
      <van-dropdown-item title="选择上课时间"></van-dropdown-item>
      <van-dropdown-item title="选择老师条件">
        <div class="jbn_attr">
          <p>老师类型</p>
          <ul class="jbn_lever">
            <li v-for="(item,index) in teacherLever" :key="index">{{item.level_name}}</li>
          </ul>
          <p class="jbn_look">只看</p>
          <p class="jbn_choice">
            <input type="checkbox" />已关注
            <input type="checkbox" />只上课的
          </p>
          <p>性别</p>
          <ul class="jbn_lever">
            <li>男</li>
            <li>女</li>
          </ul>
          <div class="class" v-for="(item,index) in attrList" :key="index">
            <p>
              {{ item.attr_name}}
            </p>
            <ul class="jbn_lever">
              <li v-for="(val,i) in item.child" :key="i">
                {{val.attr_val_name}}
              </li>
            </ul>
          </div>
          
        </div>
        <div class="jbn_resetBtn">
            <p>重置</p>
            <p>确定</p>
          </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 老师列表开始 -->
    <ul class="jbn_teacherList">
      <li v-for="(item,index) in teacherList" :key="index">
        <img :src="item.avatar" alt />
        <p>
          <span>{{item.real_name}}</span>
          <span>
            {{ item.sex==0?'男':'女' }}
            {{item.teach_age}}年教龄
          </span>
        </p>
        <button @click="goApp(item.teacher_id)">预约</button>
      </li>
    </ul>
    <!-- 老师列表结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacherList: [], //老师数据列表
      teacherLever: [], //老师等级
      attrList: [] //年级学科
    };
  },
  created() {},
  mounted() {
    this.getTeacher();
    this.getOptions();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //   获取老师数据
    getTeacher() {
      this.$axios({
        url: "https://www.365msmk.com/api/app/otoCourse?",
        params: {
          page: 1,
          limit: 10
        }
      }).then(res => {
        // console.log(res);
        this.teacherList = res.data.data;
        console.log(this.teacherList);
      });
    },
    // 跳转到搜索页面
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    // 点击立即预约进入预约页面
    goApp(id) {
      console.log(id);
      this.$router.push({
        path: "/appoint",
        query: {
          id: id
        }
      });
    },
    // 获取筛选条件
    getOptions() {
      this.$axios({
        url: "https://www.365msmk.com/api/app/otoCourseOptions?"
      }).then(res => {
        this.teacherLever = res.data.data.otoTeacherLevel;
        this.attrList = res.data.data.attrList;
        console.log(this.teacherLever);
        console.log(this.attrList);
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
.jbn_content {
  //   height: 100%;
  background: #f0f2f5;
}
.jbn_nav {
  width: 100%;
  height: 88px;
  border-bottom: 2px solid #ccc;
  font-size: 34px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
}
/deep/.jbn_downList {
  height: 100px;
  margin-top: 88px;
}
/deep/.van-dropdown-menu__bar {
  height: 100px;
  font-size: 40px;
  color: #1e1e1e;
}
.jbn_teacherList {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  li {
    width: 710px;
    height: 160px;
    padding: 40px 30px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    p {
      display: flex;
      flex-direction: column;
      width: 384px;
      span:nth-of-type(1) {
        font-size: 30px;
        color: #848484;
      }
      span:nth-of-type(2) {
        font-size: 24px;
        color: #d0d0d0;
      }
    }
    button {
      background: #ebeefe;
      color: #eb8541;
      border: none;
      border-radius: 25px;
      height: 62px;
      width: 140px;
    }
  }
}
.jbn_attr {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.jbn_lever {
  width: 690px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 2px solid #f4f4f4;
  padding: 20px 0px;
  li {
    width: 140px;
    height: 70px;
    background: #f5f5f5;
    border-radius: 10px;
    line-height: 70px;
    text-align: center;
    color: #807c77;
    font-size: 24px;
    margin-top: 20px;
  }
}
.jbn_look {
  margin-top: 20px;
}
.jbn_choice {
  padding: 20px 0px;
  display: flex;
  border-bottom: 2px solid #f4f4f4;
  align-items: center;
}
.jbn_resetBtn{
  width:100%;
  display:flex;
  height:90px;
  p{
    width:50%;
    height:100%;
    font-size:32px;
    line-height:90px;
    text-align:center;
  }
  p:nth-of-type(1){
    color:#ed6d14;
  }
  p:nth-of-type(2){
    background: #ed6d14;
    color:#fff;
  }

}
</style>
