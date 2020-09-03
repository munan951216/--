<template>
  <div class="jbn_content">
    <div class="jbn_head">
      <p>
        <van-icon name="arrow-left" color="#fff" @click="goBack"></van-icon>
        <span>订单详情</span>
        <span></span>
      </p>
      <p>交易完成</p>
    </div>
    <div class="jbn_box">
      <div class="jbn_list">
        <h4>{{ orderDetail.shop_name}}</h4>
        <div class="jbn_order">
          <p>
            <span>订单编号：</span>
            <span>{{orderDetail.order_number}}</span>
          </p>
          <p>
            <span>下单时间</span>
            <span>{{orderDetail.created_at | dataTime3}}</span>
          </p>
          <p>
            <span>支付方式</span>
            <span>{{orderDetail.pay_type}}</span>
          </p>
        </div>
        <div class="jbn_coupon">
          <div>
            <span>商品原价：</span>
            <p>
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              <span>{{orderDetail.order_price}}</span>
            </p>
          </div>
          <div>
            <span>优惠券：</span>
            <p>
              -<img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              <span>{{orderDetail.coupon_discount}}</span>
            </p>
          </div>
          <div>
            <span>实付金额：</span>
            <p>
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              <span>{{ orderDetail.original_price}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      id: "",
      orderDetail: []
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.getOrderDetail();
  },
  methods: {
    // 点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取订单详情
    getOrderDetail() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/myOrder/detail",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          order_id: this.id
        }
      }).then(res => {
        this.orderDetail = res.data.data;
        console.log(this.orderDetail);
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
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
.jbn_head {
  width: 100%;
  height: 220px;
  background: #5897ef;
  p:nth-of-type(1) {
    width: 100%;
    padding: 0px 35px;
    box-sizing: border-box;
    height: 90px;
    display: flex;
    justify-content: space-between;
    font-size: 34px;
    align-items: center;
    color: #fff;
  }
  p:nth-of-type(2) {
    width: 100%;
    height: 130px;
    text-align: center;
    line-height: 130px;
    color: #fff;
    font-size: 26px;
  }
}
.jbn_box {
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
  .jbn_list {
    width: 700px;
    height: 455px;
    background: #fff;
    border-radius: 10px;
    padding: 35px 30px;
    box-sizing: border-box;
    h4 {
      font-size: 30px;
      color: #63635d;
      margin-bottom: 35px;
    }
    .jbn_order {
      border-top: 3px solid #f6f6f6;
      border-bottom: 3px solid #f6f6f6;
      padding: 30px 0px;
      line-height: 40px;
      p {
        display: flex;
        justify-content: space-between;
        color: #939294;
        font-size: 26px;
      }
    }
    .jbn_coupon{
      padding-top:30px;
      div{
        display: flex;
        justify-content: space-between;
        color:#a8a29d;
        p{
          font-size:24px;
          color:#a0a5a5;
          img{
            width: 20px;
            height:20px;
          }
        }
      }
      div:nth-of-type(3){
        color:#6d6d6e;
        font-size:28px;
        line-height:40px;
        p{
          span{
            color:#e64e42;
          }
        }
        img{
          width:25px;
          height:25px;
        }

      }
    }
  }
}
</style>
