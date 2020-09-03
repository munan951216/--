<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>我的余额</span>
      <span @click="goDetail">余额明细</span>
    </p>
    <p class="jbn_in">
      我的余额
      <span>{{balance.balance}}学习币</span>
    </p>
    <div class="jbn_list">
      <p
        v-for="(item,index) in rank"
        :key="index"
        :class="activeIndex==index?'active':''"
        @click="change(index,item.id)"
      >
        <span>{{ `${item.rmb}`/100+".00"}}学习币</span>
        <span>￥{{ `${item.coin}`/100+".00"}}</span>
      </p>
    </div>
    <div class="jbn_tip">
      <h3>充值说明</h3>
      <p>
        1、学习币是网校中专有的一种虚拟货币，大家可以用学习币购买网校内的任何虚拟商品，比如课程、辅导答疑。
        <br />2、充值后没有使用期限,但无法提现,退款和转赠他人。
        <br />3、如遇到无法充值、充值失败等问题,请联系客服。
      </p>
    </div>
    <p class="jbn_btn">
      <button @click="show=true">立即充值</button>
    </p>
    <!--支付方式弹出层开始  -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <h3>支付方式</h3>
      <p>
        <van-radio-group v-model="radio">
          <van-radio name="1">
            <van-icon name="wechat" color="green" size="25px"></van-icon>微信
          </van-radio>
          <van-radio name="2">
            <van-icon name="alipay" color="blue" size="25px"></van-icon>支付宝
          </van-radio>
          <p class="jbn_res">
            <button @click="goBuy">立即充值</button>
          </p>
        </van-radio-group>
      </p>
    </van-popup>
    <!--支付方式弹出层结束  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: [],
      rank: [],
      activeIndex: "",
      show: false,
      radio: "",
      id:""
    };
  },
  created() {},
  mounted() {
    this.getBalance();
    this.getBlank();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取余额
    getBalance() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/coinBalance?",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        //   console.log(res)
        this.balance = res.data.data;
      });
    },
    // 获取充值数据
    getBlank() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/coin/coinRank?",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.rank = res.data.data.list;
        console.log(this.rank);
      });
    },
    change(i,id) {
        this.id=id
      this.activeIndex = i;
    },
    // 点击立即充值去充值
    goBuy() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/pay",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method:"POST",
        params:{
            coin_id:this.id,
            type: "wx"
        }
      }).then(res=>{
          console.log(res)
          alert(res.data.data.response.mweb_url)
      })
    },
    // 点击余额明细进入余额页面
    goDetail(){
        this.$router.push({
            path:"/details"
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
.jbn_content {
  width: 100%;
  height: 100%;
  background: #eeeeee;
}
.jbn_nav {
  width: 100%;
  padding: 0px 30px;
  height: 100px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  border-bottom: 2px solid #f7f7f7;
  color: #6c6462;
  background: #fff;
}
.jbn_in {
  width: 100%;
  height: 100px;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  font-size: 30px;
  box-sizing: border-box;
  background: #fff;
  span {
    color: #dc6d48;
    margin-left: 10px;
  }
}
.jbn_list {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  p {
    width: 690px;
    height: 100px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    span:nth-of-type(2) {
      color: red;
    }
  }
}
.jbn_btn {
  width: 100%;
  height: 88px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  button {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 34px;
    border: none;
  }
}
.jbn_tip {
  width: 100%;
  margin-bottom: 90px;
  h3 {
    height: 60px;
    font-size: 26px;
    line-height: 60px;
    text-indent: 30px;
    border-left: 3px solid #eb6100;
  }
  p {
    color: #6c6462;
    padding-left: 30px;
  }
}
.active {
  background: #fcede2;
  border: 1px solid #eb6100;
}
/deep/ .van-popup {
  h3 {
    font-size: 32px;
    text-indent: 40px;
    height: 90px;
    line-height: 90px;
  }
}
/deep/ .van-radio {
  padding-left: 30px;
}
/deep/ .van-radio__icon {
  width: 25px;
  height: 25px;
}
.jbn_res {
  width: 100%;
  height: 88px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  button {
    width: 100%;
    height: 100%;
    background: #eb6100;
    color: #fff;
    border: none;
  }
}
</style>
