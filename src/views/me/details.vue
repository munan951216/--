<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click='goBack'></van-icon>
      <span>余额明细</span>
      <span></span>
    </p>
    <div class="jbn_list">
      <div v-for="(item,index) in list" :key="index">
        <p>
          <span>{{ item.shop_name}}</span>
          <span>- {{item.change_price}}</span>
        </p>
        <p>
          <span>{{ item.remaining_sum}}</span>
          <span>{{ item.created_at | dataTime5}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {},
  mounted() {
    this.getDetails();
  },
  methods: {
    //   点击返回上一页
    goBack(){
        this.$router.go(-1)
    },
    //   获取余额明细
    getDetails() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/coin/item?page=1&",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.list = res.data.data.list;
        console.log(this.list);
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
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  border-bottom: 2px solid #f4f4f4;
}
.jbn_list {
  width: 100%;
  div {
    width: 100%;
    height: 115px;
    padding: 20px 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #f6f7f9;
    p {
      display: flex;
      justify-content: space-between;
    }
    p:nth-of-type(1){
        font-size:28px;
        color:#3d3d3d;
        span:nth-of-type(1){
            display: block;
            width:395px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    p:nth-of-type(2){
        font-size:20px;
        color:#a9a9a9;
        margin-top:15px;
    }
  }
}
</style>
