<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" size="25px"></van-icon>
      <span>错题记录</span>
      <van-icon name="search" size="25px" @click="goSearch"></van-icon>
    </p>
    <!-- 下拉菜单开始 -->
    <van-dropdown-menu>
      <van-dropdown-item title="类型不限" ref="item">
        <div class="jbn_all">
          <p>全部</p>
          <p>套卷练习</p>
          <p>考点专练</p>
          <p>仿真模考</p>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="巩固全部错题" ref="item"></van-dropdown-item>
      <van-dropdown-item title="移除错题" ref="item"></van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉菜单结束 -->
    <!-- 列表部分开始 -->
    <div class="jbn_errList" v-if="errList.length>0">
      <div v-for="(item,index) in errList" :key="index">
        <p>
          <span>
            {{ item.name}}
          </span>
          <span>
            {{item.error_count}}道错题
          </span>
        </p>
        <p>
          提交时间：{{ item.created_at}}
        </p>
        <p>
          <span @click="goErrList(item.paper_id,item.created_at,item.name)">巩固错题</span>
        </p>
      </div>
    </div>
    <div class="jbn_rollList" v-else>
      <img src="../../assets/empty.png" alt />
      <p>暂无错题记录</p>
    </div>
    <p class="jbn_more">没有更多了</p>
    <!-- 列表部分结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      errList: []
    };
  },
  created() {},
  mounted() {
    this.getErr();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 跳转到搜索页面
    goSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    // 获取错题记录
    getErr() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myExam/errorRecord",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params: {
          page: 1,
          limit: 10,
          ques_source: -1,
          keywords: ""
        },
        method: "POST"
      }).then(res => {
        this.errList = res.data.data.list
        console.log(this.errList)
      });
    },
    // 获取错题信息
    goErrList(id,timer,name){
      let time1=(new Date(timer).getTime())/1000
      this.$router.push({
        path:"/errList",
        query:{
          id:id,
          time1:time1,
          name:name
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
.jbn_nav {
  width: 100%;
  height: 100px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #f4f4f4;
  font-size: 36px;
}
/deep/ .van-dropdown-menu {
  height: 80px;
}
/deep/ .van-dropdown-menu__bar {
  height: 80px;
}
.jbn_list {
  width: 100%;
  height: 570px;
  /deep/ .van-sidebar {
    width: 300px;
    height: 100%;
  }
  /deep/ .van-sidebar-item {
    height: 100px;
  }
  /deep/ .van-sidebar-item__text {
    height: 100px;
    width: 300px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
  }
}
.jbn_all {
  width: 100%;
  //   height: 300px;
  p {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #595959;
    font-size: 28px;
  }
  p:nth-of-type(2) {
    border-top: 3px solid #f5f5f5;
    border-bottom: 3px solid #f5f5f5;
  }
}
.jbn_rollList {
  width: 100%;
  text-align: center;
  img {
    width: 310px;
    height: 310px;
  }
  p {
    font-size: 30px;
    color: #9b9794;
    margin-top: 40px;
  }
}
.jbn_errList{
  width:100%;
  padding:30px;
  box-sizing: border-box;
  div{
    width:690px;
    height:240px;
    border:2px solid #f6f6f7;
    border-radius:10px;
    padding:30px;
    box-sizing: border-box;
    margin-bottom:10px;
    p:nth-of-type(1){
      display:flex;
      justify-content: space-between;
      span:nth-of-type(1){
        font-size:28px;
        color:#666666;
      }
      span:nth-of-type(2){
        color:#6d8cff;
        font-size:26px;
      }
    }
    P:nth-of-type(2){
      color:#9c9c9c;
      font-size:26px;
      margin-top:25px;
    }
    p:nth-of-type(3){
      margin-top:30px;
      span{
        float: right;
        display: block;
        width:150px;
        height:50px;
        border:3px solid #5b7dff;
        color:#5b7dff;
        border-radius:25px;
        text-align:center;
        line-height: 50px;
      }
    }
  }
}
.jbn_more{
  width:100%;
  text-align:center;
  color:#a09fa3;
  font-size:26px;
}
</style>
