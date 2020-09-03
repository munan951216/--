<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" size="25px"></van-icon>
      <span>习题收藏</span>
      <van-icon name="search" size="25px" @click="goSearch"></van-icon>
    </p>
    <!-- 下拉菜单开始 -->
    <van-dropdown-menu>
      <van-dropdown-item title="题目类型" ref="item">
        <div class="jbn_all">
          <p>单选</p>
          <p>多选</p>
          <p>判断</p>
          <p>连线</p>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉菜单结束 -->
    <!-- 列表部分开始 -->
    <div class="jbn_starList" v-if="startList.length>0">
      <div v-for="(item,index) in startList" :key="index" >
        <div>
          <p>[{{ item.ques_type==1?"单选题":"多选题"}}]</p>
          <div v-html="item.ques_stem"></div>
        </div>
        <p>
          <span @click="goDetail(item.ques_id)">查看详情</span>
        </p>
      </div>
    </div>
    <div class="jbn_rollList" v-else>
      <img src="../../assets/empty.png" alt />
      <p>暂无错题记录</p>
    </div>
    <!-- 列表部分结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      startList: []
    };
  },
  created() {},
  mounted() {
    this.getCollect();
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
    // 获取收藏的题目
    getCollect() {
      let token = localStorage.getItem("token");
      this.$axios({
        url:
          "https://www.365msmk.com/api/app/collect?page=1&limit=10&type=3&ques_type=&mix_keyword=&init=function(){this.ques_type=%22%22}&",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        this.startList = res.data.data.list;
      });
    },
    // 跳转到详情页
    goDetail(id){
      this.$router.push({
        path:"/detail",
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
.jbn_starList {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  > div {
    width: 690px;
    padding: 30px;
    box-sizing: border-box;
    border: 3px solid #f7f7f8;
    border-radius: 10px;
    margin-bottom: 10px;
    > div {
      display: flex;
      p {
        color: #19a1fb;
        width: 110px;
      }
      // div{
      //   width:
      // }
    }
    > p {
      span {
        margin-left: 470px;
        width: 150px;
        height: 50px;
        border: 2px solid #ee7622;
        display: block;
        text-align:center;
        line-height: 50px;
        color:#ee7622;
        border-radius:25px;
      }
    }
  }
}
</style>
