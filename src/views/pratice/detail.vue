<template>
  <div>
    <div class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" size="20px"></van-icon>
      <p>
        <van-icon name="apps-o" size="20px"></van-icon>
        <van-icon name="star" size="20px" color="orange" @click="cancel" v-if="show"></van-icon>
        <van-icon name="star-o" size="20px" v-else @click="getCollect"></van-icon>
        <van-icon name="todo-list-o" size="20px"></van-icon>
      </p>
    </div>
    <!-- 题目详情 -->
    <div class="jbn_ques">
      <div class="jbn_qu">
        <p>{{quesDetail.ques_type==1?"单选":"多选"}}</p>
        <div v-html="quesDetail.ques_stem_text"></div>
      </div>
      <ul>
        <li v-for="(item,index) in quesDetail.ques_option" :key="index">
          <input type="radio" />
          <div v-html="item.content"></div>
        </li>
      </ul>
    </div>
    <hr />
    <p class="jbn_txt">正确答案：D</p>
    <div class="jbn_ttt">
      <p>考点：</p>
      <p>{{quesDetail.point_name}}</p>
      <p>
        解析：
        {{ quesDetail.ques_analysis==null?"暂无解析":quesDetail.ques_analysis}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      quesDetail: [],
      collect_id:"",
      show:true
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getDetail();
  },
  methods: {
    // 点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    // 获取题目详情
    getDetail() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/myCollect/detail/${this.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        //   console.log(res)
        this.quesDetail = res.data.data;
        console.log(this.quesDetail);
      });
    },
    // 取消收藏
    cancel(){
      let token = localStorage.getItem("token");
      this.collect_id=this.quesDetail.collect_id
      // console.log(this.collect_id)
      this.$axios({
        url:`https://www.365msmk.com/api/app/collect/cancel/${this.collect_id}/3`,
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res=>{
        console.log(res)
        this.$toast("已取消")
        this.show=false
      })
    },
    // 添加收藏
     // 点击收藏将题目进行收藏
    getCollect() {
      let token = localStorage.getItem("token");
      this.$axios({
        url:"https://www.365msmk.com/api/app/collect",
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params:{
          ques_id: this.id,
          type: 3
        }
      }).then(res=>{
        this.$toast.success("收藏成功")
        if(res.data.code==200){
          this.show=true
        }

      })
    },
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
  border-bottom: 2px solid #fafbfb;
  padding: 0px 30px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: space-between;
  p{
    width:200px;
    display: flex;
    justify-content: space-between;
  }
}
.jbn_ques {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  .jbn_qu {
    display: flex;
    p {
      width: 80px;
      height: 40px;
      background: #0097fa;
      color: #fff;
      border-radius: 15px 0px 15px 0px;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
    }
  }
  ul {
    li {
      display: flex;
    }
  }
}
hr {
  width: 100%;
  height: 12px;
  background: #f0f2f5;
  border: none;
}
.jbn_txt {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  color: #797a7a;
  font-size: 28px;
}
.jbn_ttt {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  p:nth-of-type(1) {
    color: #a6a6a6;
    font-size: 28px;
  }
  p:nth-of-type(2) {
    background: #0097fa;
    border-radius: 20px;
    color: #fff;
    width: 140px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
