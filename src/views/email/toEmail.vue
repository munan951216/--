<template>
  <div class="jbn_email">
    <div class="jbn_message">
      <p>给我们留言</p>
      <van-icon name="arrow-down" color="#fff" @click="back" />
    </div>
    <p class="jbn_careful">您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</p>
    <p class="jbn_tel">手机</p>
    <p class="jbn_mobile">
      <input type="text" placeholder="请输入" />
    </p>
    <p class="jbn_msg">
      留言内容
      <span>*</span>
    </p>
    <p class="jbn_msg1">
      <input type="text" placeholder="请输入" />
    </p>
    <p class="jbn_btn">
      <van-button type="info" block @click="toMsg">提交</van-button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "", //手机号
      msg: "" //留言内容
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 点击向下箭头返回上一个页面
    back() {
      this.$router.go(-1);
    },
    // 留言
    toMsg() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://new-api.meiqia.com/client/tickets_v2",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: {
          enterprise_id: 149768,
          track_id: "1g2NmCBOAhy8ohZsAMI9oXk4G2H",
          visit_id: "1grZrsFqDTqi1ZB1N9LeK6K5m3X",
          channel: "widget",
          content: this.msg,
          client_info: { tel: this.mobile },
          reserve_token: null
        }
      }).then(res => {
        console.log(res);
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
.jbn_email {
  background: #f2f3f5;
  height: 1260px;
}
.jbn_message {
  width: 100%;
  height: 120px;
  background: #3478f5;
  padding: 0px 20px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
}
.jbn_careful {
  width: 100%;
  padding: 20px 32px;
  height: 120px;
  box-sizing: border-box;
  color: #656567;
  font-size: 16px;
}
.jbn_tel {
  width: 100%;
  height: 80px;
  padding: 20px 32px;
  box-sizing: border-box;
  color: #3c3c3e;
  font-size: 24px;
}
.jbn_mobile {
  width: 750px;
  height: 75px;
  input {
    width: 100%;
    height: 75px;
    border: none;
    background: #fff;
    text-indent: 24px;
    border-radius: 10px;
    &::placeholder {
      color: #a3a3a3; 
    }
  }
}
.jbn_msg {
  width: 100%;
  height: 84px;
  padding: 32px;
  box-sizing: border-box;
  font-size: 24px;
  color: #3c3c3e;
  span {
    color: red;
  }
}
.jbn_msg1 {
  width: 100%;
  height: 180px;
  background: #fff;
  margin-top: 10px;
  input {
    width: 100%;
    height: 180px;
    border: none;
    background: #fff;
    text-indent: 24px;
    border-radius: 10px;
    &::placeholder {
      color: #a3a3a3;
    }
  }
}
.jbn_btn {
  width: 100%;
  height: 82px;
  padding: 0px 40px;
  box-sizing: border-box;
  margin-top: 32px;
  .van-button {
    height: 82px;
    border-radius: 6px;
  }
}
</style>
