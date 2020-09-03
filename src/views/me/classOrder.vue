<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>课程订单</span>
      <span></span>
    </p>
    <van-tabs title-active-color="red" line-width="34px" line-height="3px">
      <van-tab title="全部订单" name="a">
        <div class="jbn_list" v-if="orderList.length==0">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
        <div class="jbn_orderList" v-else>
          <div class="jbn_allList" v-for="(item,index) in orderList" :key="index" @click="goOrderCate(item.id)">
            <p>
              <span>
                订单编号：
                {{item.order_number}}
              </span>
              <span>交易完成</span>
            </p>
            <p>
              {{item.title}}
            </p>
            <p>
              时间：{{item.created_at | dataTime3}}
            </p>
            <p>实付款：
               <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
               {{item.order_price}}
            </p>
          </div>
        </div>
      </van-tab>
      <van-tab title="待支付" name="b">
        <div class="jbn_list" v-if="payOrderList.length==0">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
         <div class="jbn_orderList" v-else>
          <div class="jbn_allList" v-for="(item,index) in orderList" :key="index">
            <p>
              <span>
                订单编号：
                {{item.order_number}}
              </span>
              <span>交易完成</span>
            </p>
            <p>
              {{item.title}}
            </p>
            <p>
              时间：{{item.created_at | dataTime3}}
            </p>
            <p>实付款：
               <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
               {{item.order_price}}
            </p>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成" name="c">
        <div class="jbn_list"  v-if="allList.length==0">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
         <div class="jbn_orderList" v-else>
          <div class="jbn_allList" v-for="(item,index) in allList" :key="index">
            <p>
              <span>
                订单编号：
                {{item.order_number}}
              </span>
              <span>交易完成</span>
            </p>
            <p>
              {{item.title}}
            </p>
            <p>
              时间：{{item.created_at | dataTime3}}
            </p>
            <p>实付款：
               <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
               {{item.order_price}}
            </p>
          </div>
        </div>
      </van-tab>
      <van-tab title="已取消" name="d">
        <div class="jbn_list" v-if="delList.length==0">
          <img src="../../assets/quan_03.jpg" alt />
          <p>暂无订单</p>
        </div>
        <div class="jbn_orderList" v-else>
          <div class="jbn_allList" v-for="(item,index) in allList" :key="index" @click="goOrderCate">
            <p>
              <span>
                订单编号：
                {{item.order_number}}
              </span>
              <span>已取消</span>
            </p>
            <p>
              {{item.title}}
            </p>
            <p>
              时间：{{item.created_at | dataTime3}}
            </p>
            <p>实付款：
               <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
               {{item.order_price}}
            </p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [], //全部订单列表
      payOrderList:[],  //待支付课程订单
      allList:[],  //已完成订单 
      delList:[] //已取消订单
    };
  },
  created() {},
  mounted() {
    this.getClassOrder();
    this.getPayOrder()
    this.getOrder()
    this.getDelOrder()
  },
  methods: {
    // 点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取全部课程订单
    getClassOrder() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          page: 1,
          limit: 10,
          order_status: 0,
          order_type: 2
        }
      }).then(res => {
        console.log(res);
        this.orderList = res.data.data.list;
        console.log(this.orderList)
      });
    },
    // 获取待支付课程订单
    getPayOrder(){
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          page: 1,
          limit: 10,
          order_status: 1,
          order_type: 2
        }
      }).then(res => {
        console.log(res);
        this.payOrderList = res.data.data.list;
      });
    },
    // 获取已完成订单
    getOrder(){
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          page: 1,
          limit: 10,
          order_status: 2,
          order_type: 2
        }
      }).then(res => {
        console.log(res);
        this.allList = res.data.data.list;
      });
    },
    getDelOrder(){
        let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        data: {
          page: 1,
          limit: 10,
          order_status: 3,
          order_type: 2
        }
      }).then(res => {
        console.log(res);
        this.delList = res.data.data.list;
      });
    },
    //跳转到订单详情页面
    goOrderCate(id){
      this.$router.push({
        path:"/orderCate",
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
  height: 88px;
  border-bottom: 2px solid #fbfbfb;
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 30px;
  align-items: center;
  color: #a0a0a0;
}
/deep/.van-tabs {
  height: 88px;
  border-bottom: 3px solid #f9f9f9;
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
.jbn_list {
  width: 100%;
  padding: 0px 220px;
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
.jbn_orderList {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  .jbn_allList {
    width: 690px;
    height: 250px;
    border: 3px solid #f4f4f4;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 30px;
    box-sizing: border-box;
     font-size:26px;
    img{
      width:25px;
      height:25px;
    }
    p:nth-of-type(1){
      line-height:50px;
      border-bottom:3px solid #f7f7f7;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1){
        color:#7d7d7d;
        font-size:26px;
      }
      span:nth-of-type(2){
        color:#ec8645;
      }
    }
    p:nth-of-type(2){
     color:#717373;
     line-height:50px;
    }
    p:nth-of-type(3){
      color:#968f94;
      line-height:50px;
    }
    p:nth-of-type(4){
      color:#968f94;
      line-height:50px;
    }
  }
}
</style>
