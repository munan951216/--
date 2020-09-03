<template>
  <div class="jbn_content">
    <div class="jbn_search">
      <van-icon name="arrow-left" @click="back" />
      <input type="text" placeholder="请输入内容" @input="keyInput" v-model="keywords" />
      <span @click="back()" v-if="isShow">取消</span>
      <span v-else @click="search">搜索</span>
    </div>
    <div class="jbn_history" v-if="history">
      <div>
        <p>历史搜索</p>
        <van-icon name="delete" @click="delHistory" />
      </div>
      <ul>
        <li
          v-for="(item,index) in historyList"
          :key="index"
          @click="addKeywords(item,index)"
        >{{ item }}</li>
      </ul>
    </div>
    <!-- 列表部分开始 -->
    <div class="jbn_box">
      <div class="jbn_class">
        <ul>
          <li v-for="(item,index) in classList" :key="index" @click="goClassCategory(item.id)">
            <img src="../assets/order.png" alt class="jbn_biao" v-if="item.has_buy==1" />
            <p class="jbn_tit">{{ item.title}}</p>
            <p class="jbn_periods">
              <span>{{ item.start_play_date | dataTime }}~{{ item.end_play_date | dataTime1 }}</span>
              <span>共{{item.total_periods}}课时</span>
            </p>
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
    </div>
    <!-- 列表部分结束 -->
    <!-- 无搜索结果 -->
    <div class="jbn_noSearch" v-if="noSearch">
      <img src="../assets/empty.png" alt />
      <p>暂无搜索结果</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true, //搜索取消显示
      history: true, //历史记录显示隐藏
      keywords: "", //搜索关键字
      name: "",
      page: 1,
      limit: 10,
      course_type: "",
      classList: [],
      historyList: JSON.parse(localStorage.getItem("historyList")) || [],
      noSearch: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 返回上一个页面
    back() {
      this.$router.go(-1);
    },
    // 输入框输入事件
    keyInput() {
      this.isShow = false;
      this.history = false;
      if (this.keywords == "") {
        this.isShow = true;
        this.history = true;
        this.classList = [];
      }
    },
    // 点击搜索进行搜索
    search() {
      //   if (this.name == "oto") {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/courseBasis?limit=${this.limit}&page=${this.page}&course_type=${this.course_type}&keywords=${this.keywords}`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.classList = res.data.data.list;
          } else {
            this.noSearch = true;
          }
        }
      });
      this.historyList.unshift(this.keywords);
      if (this.historyList.length > 5) {
        this.historyList.pop(this.historyList.length - 1);
      }
      //   }
    },
    // 点击删除按钮删除历史记录
    delHistory() {
      localStorage.removeItem("historyList");
      this.historyList = [];
    },
    // 点击历史记录继续搜索
    addKeywords(item, index) {
      this.keywords = item;
      this.historyList.splice(index, 1);
      this.isShow = false;
    }
  }
};
</script>
<style scoped lang="scss">
.jbn_search {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  input {
    border: none;
    width: 500px;
    height: 70px;
    background: #eee;
    border-radius: 40px;
    text-indent: 15px;
  }
  span {
    color: #8b8b8b;
  }
}
.jbn_history {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 100px;
  }
  ul {
    width: 100%;
    display: flex;
    li {
      padding: 10px 15px;
      background: #f7f7f7;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
}
// 精品课程部分布局
.jbn_class {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  margin-top: 100px;
  ul {
    li {
      background: #fff;
      margin-bottom: 30px;
      padding: 30px 25px;
      box-sizing: border-box;
      border-radius: 6px;
      position: relative;
      .jbn_biao {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 120px;
        right: 40px;
      }
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
.jbn_noSearch {
  width: 100%;
  padding: 20px 220px;
  box-sizing: border-box;
  img {
    width: 310px;
    height: 310px;
  }
  p {
    font-size: 26px;
    color: #8b8b8b;
    text-align: center;
  }
}
</style>
