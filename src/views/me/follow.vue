<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>我的关注</span>
      <span></span>
    </p>
    <div class="jbn_dui" v-if="collectList.length==0">
      <img src="../../assets/empty.png" alt />
      <p>暂无关注</p>
    </div>
    <div class="jbn_collectList" v-else>
      <div v-for="(item,index) in collectList" :key="index" @click="goCategory(item.teacher_id)">
        <img :src="item.avatar" alt />
        <div>
          <p>
            <span>{{item.teacher_name}}</span>
            <span>{{ item.level_name}}</span>
          </p>
          <p>{{ item.introduction }}</p>
        </div>
        <p @click.stop="cancelCollect(item.collect_id)">取消关注</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectList: [], //关注列表
      collect_id: ""
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
    // 获取关注讲师列表
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
          type: 2
        }
      }).then(res => {
        this.collectList = res.data.data.list;
        // this.collect_id = res.data.data.list.collect_id;
        // console.log(this.collectList)
        // console.log(this.collect_id);
      });
    },
    // 取消关注
    cancelCollect(id) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/collect/cancel/${id}/2`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.getCollect()
        console.log(res);
      });
    },
    // 进入老师详情页面
      // 点击进入老师详情页面
    goCategory(id){
      this.$router.push({
        path:"/category",
        query:{
          id:id
        }
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
  > div {
    width: 710px;
    height: 146px;
    background: #fff;
    border-radius: 10px;
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    img {
      width: 80px;
      height: 80px;
    }
    div {
      width: 380px;
      p:nth-of-type(1) {
        span:nth-of-type(1) {
          color: #6c6e70;
          font-size: 30px;
        }
        span:nth-of-type(2) {
          color: #ec792a;
        }
      }
      p:nth-of-type(2) {
        color: #bcbcbd;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    > p {
      width: 150px;
      height: 60px;
      background: #fdefe5;
      border-radius: 25px;
      color: #ec7441;
      font-size: 28px;
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>
