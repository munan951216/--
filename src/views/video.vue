<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span class="jbn_span">{{title}}</span>
      <span></span>
    </p>
    <div id="jbn_video"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video_id: "",
      id: "",
      title: ""
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.video_id = this.$route.query.video_id;
    this.title = this.$route.query.title;
    this.getVideo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取视频课程
    getVideo() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/getPlayToken/video_id=${this.video_id}/course_id=${this.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          DeviceID: "AD11D691-BECE-AE86-1ABB-F5ADCE883D9F",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        var player = new bjcPlayer("#jbn_video", {
          token: res.data.data.token,
          definition: "low"
        });
        player.play(res.data.data.video_id);
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
  // background: #f0f2f5;
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
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  // margin-bottom: 88px;
  .jbn_span {
    width: 470px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
#jbn_video{
  width:100%;
  margin-top:88px;
  height:600px;
}
</style>
