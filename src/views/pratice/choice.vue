<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" color="#696969"></van-icon>
      <span>题库选择</span>
      <span></span>
    </p>
    <p class="jbn_search">
      <input type="text" placeholder="请输入题库名称关键字" />
    </p>
    <!-- 列表部分开始 -->
    <div class="jbn_list">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="(item,index) in navList"
          :key="index"
          @click="choice(item.id)"
        />
      </van-sidebar>
      <div>
        <div class="jbn_choice" v-for="(item,index) in choiceList" :key="index">
          <p>
            <span class="jbn_title">{{ item.name}}</span>
            <span
              v-for="(val,i) in item.bank"
              :key="i"
              class="jbn_subject"
              @click="goExa(val.id,item.id,val.name)"
            >{{val.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 列表部分结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      navList: [], //左侧导航栏
      choiceList: [] //右侧选择信息
    };
  },
  created() {},
  mounted() {
    this.getNav();
  },
  methods: {
    //   获取侧边导航信息
    getNav() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/wap/classify?",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.navList = res.data.data;
      });
    },
    // 点击左侧获取右侧信息
    choice(id) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/wap/quesBank/${id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.choiceList = res.data.data;
        console.log(this.choiceList);
      });
    },
    // 点击科目进入选中页面
    goExa(id, i_id,name) {
      console.log(id);
      console.log(i_id);
      this.$router.push({
        path: "/examination",
        query: {
          id: id,
          name:name,
          i_id: i_id
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
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: 34px;
  color: #676e72;
  align-items: center;
}
.jbn_search {
  width: 100%;
  height: 126px;
  padding: 0px 30px 30px;
  box-sizing: border-box;
  border-bottom: 3px solid #efefef;
  input {
    width: 690px;
    height: 96px;
    border: none;
    border-radius: 40px;
    background: #f7f8fa;
    outline: none;
    text-indent: 30px;
    &::placeholder {
      font-size: 28px;
      color: #a8a3a0;
    }
  }
}
/deep/ .van-sidebar {
  height: 952px;
  width: 190px;
}
/deep/ .van-sidebar-item {
  height: 100px;
  width: 190px;
}
/deep/ .van-sidebar-item__text {
  width: 190px;
  height: 100px;
  line-height: 100px;
  text-indent: 45px;
}
.jbn_list {
  width: 100%;
  display: flex;
}
.jbn_choice {
  padding: 40px;
  p {
    display: flex;
    flex-direction: column;
    .jbn_title {
      font-size: 26px;
      color: #6a655f;
    }
    .jbn_subject {
      display: block;
      // padding:
      width: 230px;
      padding: 15px 25px;
      box-sizing: border-box;
      text-align: center;
      font-size: 24px;
      background: #f5f5f5;
      margin-top: 20px;
    }
  }
}
</style>
