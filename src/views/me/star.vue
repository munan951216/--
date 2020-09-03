<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>我的收藏</span>
      <span></span>
    </p>
    <div class="jbn_dui" v-if="collectList.length==0">
      <img src="../../assets/empty.png" alt />
      <p>暂无收藏</p>
    </div>

    <div class="jbn_class">
      <ul>
        <li v-for="(item,index) in collectList" :key="index">
          <p class="jbn_tit">
            <span>{{ item.title}}</span>
            <van-icon name="star" color="#fc5500" @click="cancel(item.collect_id)"></van-icon>
          </p>
          <p class="jbn_periods">共{{item.section_num}}课时</p>
          <p v-for="(val,index) in item.teachers_list" :key="index" class="jbn_tea">
            <img :src="val.teacher_avatar" alt />
            <span>{{ val.teacher_name}}</span>
          </p>
          <p class="jbn_teacher">
            <img :src="item.teachersAvatar" alt />
            <span>{{item.teachers}}</span>
          </p>
          <div>
            <span>{{ item.sales_num}}人已报名</span>
            <span style="color:#d02221">
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              {{ item.price}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectList: [] //课程收藏列表
    };
  },
  created() {},
  mounted() {
    this.getCollect();
  },
  methods: {
    // 点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 查看收藏列表
    getCollect() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/collect",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params: {
          page: 1,
          limit: 10,
          type: 1
        }
      }).then(res => {
        this.collectList = res.data.data.list;
      });
    },
    // 取消收藏
    cancel(id) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/collect/cancel/${id}/1`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method:"PUT"
      }).then(res=>{
        this.getCollect()
      })
    }
  }
};
</script>

<style scoped lang="scss">
.jbn_content {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
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
  color: #a0a0a0;
  background: #fff;
}
.jbn_dui {
  width: 100%;
  padding: 220px;
  box-sizing: border-box;
  img {
    width: 300px;
    height: 300px;
  }
  p {
    font-size: 30px;
    color: #a3a3a3;
    padding-top: 40px;
    text-align: center;
  }
}
.jbn_collectList {
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
}
.jbn_class {
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          width: 584px;
        }
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
.jbn_teacher {
  display: flex;
  align-items: center;
  padding: 30px 0px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  span {
    color: #8e9198;
    padding-left: 15px;
  }
}
</style>
