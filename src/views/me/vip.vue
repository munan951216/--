<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" size="25px" color="#6c6462" @click="goBack"></van-icon>
      <span>开通会员</span>
      <span></span>
    </p>
    <div class="jbn_info">
      <img :src="userInfo.avatar" alt />
      <div>
        <p>{{ userInfo.nickname}}</p>
        <p>开通会员免费学习</p>
      </div>
    </div>
    <!-- 购买会员列表开始 -->
    <div class="jbn_list">
      <p>
        <span>购买会员</span>
        <span>购买会员后可免费观看会员课程</span>
      </p>
      <ul>
        <li
          v-for="(item,index) in vipList"
          :key="index"
          :class="activeIndex==index?'active':''"
          @click="change(index,item.id)"
        >
          <p>{{ item.name}}</p>
          <p>
            <img
              src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
              alt
            />
            {{ `${item.price}`/100+".00"}}
          </p>
        </li>
      </ul>
    </div>
    <!-- 购买会员列表结束 -->
    <p class="jbn_btn">
      <button @click="show=true">立即支付</button>
    </p>
    <!-- 购买会员弹出层开始 -->
    <van-popup v-model="show">
      <div class="jbn_wrapper">
        <p>
          <span>提示</span>
          <van-icon name="clear" color="#a7a9ad" @click="show=false"></van-icon>
        </p>
        <p>您确定购买此会员吗？</p>
        <p>
          <button @click="show=false">取消</button>
          <button @click="goBuy">确定</button>
        </p>
      </div>
    </van-popup>
    <!-- 购买会员弹出层结束 -->
    <!-- 购买结束 -->
      <van-popup v-model="hid">
      <div class="jbn_wrapper">
        <p>
          <span>提示</span>
          <van-icon name="clear" color="#a7a9ad" @click="hid=false"></van-icon>
        </p>
        <p>
            {{ tips.msg}}
        </p>
        <p>
          <button @click="hid=false">取消</button>
          <button @click="goCurrency">去充值</button>
        </p>
      </div>
    </van-popup>
    <!-- 购买结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: "",
      userInfo: [],
      vipList: [],
      activeIndex: 0,
      show: false,
      id: "",
      tips:[],
      hid:false
    };
  },
  created() {},
  mounted() {
    this.getUserInfo();
    this.getVipInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取用户信息
    getUserInfo() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/userInfo",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.userInfo = res.data.data;
        // console.log(this.userInfo);
      });
    },
    // 获取会员购买信息
    getVipInfo() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/vip/grade?",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.vipList = res.data.data;
        // console.log(this.vipList);
      });
    },
    // 切换选中样式
    change(i, id) {
      this.activeIndex = i;
      this.id = id;
    //   console.log(this.id);
    },
    // 点击确定去购买会员卡
    goBuy() {
        this.show=false
        this.hid=true
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/order/downOrder",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        method:"POST",
        params:{
            shop_id:this.id,
            type:14
        }
      }).then(res=>{
          console.log(res)
          this.tips=res.data.data
      })
    },
    // 点击去充值
    goCurrency(){
        this.$router.push({
            path:"/currency"
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
  background: #f0f2f5;
}
.jbn_nav {
  width: 100%;
  padding: 0px 30px;
  height: 88px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  font-size: 36px;
  border-bottom: 2px solid #f7f7f7;
  color: #6c6462;
  background: #fff;
}
.jbn_info {
  width: 100%;
  height: 140px;
  padding: 35px;
  box-sizing: border-box;
  display: flex;
  background: #fff;
  div {
    margin-left: 20px;
    font-size: 24px;
    line-height: 40px;
    p:nth-of-type(1) {
      color: #544a3f;
    }
    p:nth-of-type(2) {
      color: #a8a8a8;
    }
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.jbn_list {
  width: 100%;
  padding: 70px 30px;
  box-sizing: border-box;
  > p {
    span:nth-of-type(1) {
      color: #6c7474;
      font-size: 30px;
    }
    span:nth-of-type(2) {
      color: #abacad;
      font-size: 24px;
      margin-left: 20px;
    }
  }
  ul {
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    li {
      width: 200px;
      height: 220px;
      border: 3px solid #e9ca8d;
      border-radius: 10px;
      padding: 60px 10px;
      box-sizing: border-box;
      text-align: center;
      align-items: center;
      &.active {
        background: #f9f0d9;
      }
      p:nth-of-type(1) {
        font-size: 26px;
        font-weight: bold;
        color: #585956;
      }
      p:nth-of-type(2) {
        font-size: 44px;
        color: #d29e35;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
.jbn_btn {
  width: 100%;
  height: 86px;
  position: fixed;
  bottom: 60px;
  left: 0px;
  padding: 0px 30px;
  box-sizing: border-box;
  button {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    border: none;
    background: #d3b685;
    color: #fff;
  }
}
.jbn_wrapper {
  width: 425px;
//   height: 155px;
  padding: 20px;
  box-sizing: border-box;
  line-height: 40px;
  p:nth-of-type(1) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    color: #4a4b4d;
  }
  p:nth-of-type(2) {
    font-size: 24px;
    color: #76777b;
  }
  p:nth-of-type(3) {
    display: flex;
    justify-content: flex-end;
    button:nth-of-type(1) {
      width: 74px;
      height: 40px;
      border: 4px solid #e1e4e9;
      color: #6d6f72;
      border-radius: 5px;
      background: none;
      margin-right: 5px;
    }
    button:nth-of-type(2) {
      width: 74px;
      height: 40px;
      border: none;
      color: #fff;
      border-radius: 5px;
      background: #eb6100;
    }
  }
}
</style>
