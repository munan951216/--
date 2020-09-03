<template>
  <div class="jbn_content">
    <!-- 我的信息页面开始 -->
    <van-nav-bar title="信息填写" left-arrow @click-left="goBack" />
    <!-- 个人信息 -->
    <div class="jbn_info">
      <p @click="show=true">
        <span>头像</span>
        <span>
          <img :src="img" alt style="border-radius:50%" />
        </span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>昵称</span>
        <span>{{userInfo.nickname}}</span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>手机号</span>
        <span>{{userInfo.mobile}}</span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p @click="goUpdate">
        <span>性别</span>
        <span>
          {{val}}
        </span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>出生日期</span>
        <span>请选择</span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>所在城市</span>
        <span>请选择</span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>学科</span>
        <span></span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
      <p>
        <span>年级</span>
        <span>请选择</span>
        <van-icon name="arrow" color="#b2b2b2"></van-icon>
      </p>
    </div>
    <!-- <p class="jbn_btn">
        <button @click="goMe">提交信息</button>
    </p>-->
    <!-- 修改头像弹出层开始 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <div>
        <p>
          <input type="file" accept="image/*" capture="camera" @change="updateImg($event)" />
          <span>拍照</span>
        </p>
        <p>
          <input type="file" accept="image/*" @change="updateImg($event)" />
          <span>从手机相册选择</span>
        </p>
        <p @click.stop="show=false">取消</p>
      </div>
    </van-popup>
    <!-- 修改头像弹出层结束 -->
    <Email></Email>
  </div>
</template>

<script>
import Email from "@/components/email";
export default {
  data() {
    return {
      show: false,
      img: "",
      userInfo: [],
      val:""
    };
  },
  created() {},
  mounted() {
    this.getUserInfo();
    this.val=this.$route.query.val
  },
  methods: {
    //返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    //   点击提交信息进入我的页面
    GoMe() {
      this.$router.push({
        path: "/me"
      });
    },
    // 获取用户信息
    getUserInfo() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/userInfo?",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        this.userInfo = res.data.data;
        this.img = res.data.data.avatar;
      });
    },
    // 切换头像
    updateImg(e) {
      console.log(e);
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.$axios({
        url: "https://www.365msmk.com/api/app/public/img",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        data: formData,
        method: "POST"
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          let token = localStorage.getItem("token");
          this.$axios({
            url: "https://www.365msmk.com/api/app/user",
            headers: {
              "Content-Type": "application/json",
              DeviceType: "H5",
              Authorization: `Bearer ${token}`
            },
            method: "PUT",
            data: {
              avatar: res.data.data.path
            }
          }).then(res => {
            this.img = res.data.data.avatar;
            console.log(res);
          });
        }
      });
    },
    // 跳转到修改性别页面
    goUpdate(){
      this.$router.push({
        path:"/updateInfo"
      })
    }
  },
  components: {
    Email
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
  height: 1240px;
  background: #f0f1f5;
}
.van-nav-bar {
  height: 88px;
}
.jbn_info {
  width: 100%;
  // height:900px;
  background: #fff;
  margin-top: 20px;
  padding: 0px 30px;
  box-sizing: border-box;
  p {
    height: 100px;
    border-bottom: 2px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 75px;
      height: 75px;
    }
    span:nth-of-type(1) {
      display: block;
      width: 440px;
      font-size: 26px;
    }
    span:nth-of-type(2) {
      width: 155px;
      text-align: right;
      color: #7f7f7f;
      font-size: 26px;
    }
  }
}
.jbn_btn {
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  button {
    width: 690px;
    height: 90px;
    background: #eb6100;
    border-radius: 10px;
    border: none;
    color: #fff;
    font-size: 30px;
  }
}
/deep/ .van-popup {
  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    p {
      height: 33%;
      text-align: center;
      line-height: 120px;
      font-size: 24px;
      input {
        opacity: 0;
      }
    }
    p:nth-of-type(2) {
      border-top: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;
    }
  }
}
</style>
