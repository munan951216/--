<template>
  <div>
    <p class="jbn_nav">
      <van-icon name="arrow-left" color="#626262" @click="goBack"></van-icon>
      <span>
        {{ name }}
      </span>
      <span></span>
    </p>
    <hr />
    <div class="jbn_bank">
      <p>
        <span @click="goChoice">
          <van-icon name="bars"></van-icon>题库选择
        </span>
        <van-icon name="setting" color="#757575" @click="show=true"></van-icon>
      </p>
      <!-- <div class="jbn_list" >
       
      </div>-->
      <div class="jbn_list" v-if="subject.length>0">
        <div v-for="(item,index) in subject" :key="index">
          <van-icon name="add" color="#c2c2c2"></van-icon>
          <p>
            <span>{{ item.name}}</span>
            <span>
              {{ item.finished_amount}}
              /
              {{ item.question_amount}}
            </span>
            <van-icon name="arrow" color="#c2c2c2" @click="goQuestion(item.id,item.parent_id)"></van-icon>
          </p>
        </div>
      </div>
    </div>
    <!-- 考点专练设置弹出层开始 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
      <p>
        <span></span>
        <span>考点专练设置</span>
        <van-icon name="clear" color="#b6b6b6" @click="show=false"></van-icon>
      </p>
      <p>设置考点专练出题设置</p>
      <!-- 单选框部分开始 -->
      <p>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1">随机15道</van-radio>
          <van-radio name="2">按顺序做题</van-radio>
        </van-radio-group>
      </p>
      <!-- 单选框部分结束 -->
      <p>
        <button @click="show=false">确定</button>
      </p>
    </van-popup>
    <!-- 考点专练设置弹出层结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      radio: 1,
      id: "",
      i_id: "",
      subject: [],
      name:""
    };
  },
  created() {},
  mounted() {
    this.getSub();
    this.name=this.$route.query.name
    console.log(this.name)
  },
  methods: {
    // 点击返回上一个页面
    goBack(){
      this.$router.push({
        path:"/practice"
      })
    },
    // 点击进入选择科目页面
    goChoice() {
      this.$router.push({
        path: "/choice"
      });
    },
    // 获取选中科目
    getSub() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/examPoint/${this.$route.query.i_id}/${this.$route.query.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.subject = res.data.data;
        console.log(this.subject);
      });
    },
    // 点击选中科目进行答题
    goQuestion(id, parent_id) {
      console.log(id);
      this.$router.push({
        path: "/question",
        query: {
          id: id,
          parent_id: parent_id
        }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #585561;
  font-size: 34px;
  box-sizing: border-box;
}
hr {
  width: 100%;
  height: 22px;
  background: #f0f2f5;
  border: none;
}
.jbn_bank {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  > p {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #5e5e58;
  }
}
.jbn_list {
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    width: 690px;
    height: 110px;
    border: 3px solid #e6e6e6;
    border-radius: 10px;
    margin-top: 40px;
    align-items: center;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  p:nth-of-type(1) {
    width: 530px;
    display: flex;
    justify-content: space-between;
    color: #838986;
    font-size: 24px;
  }
}
/deep/ .van-popup--bottom.van-popup--round {
  height: 410px;
  width: 100%;
  p:nth-of-type(1) {
    padding: 0px 30px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 3px solid #f9fafb;
    justify-content: space-between;
    height: 86px;
    align-items: center;
  }
  p:nth-of-type(2) {
    padding: 0px 30px;
    box-sizing: border-box;
    line-height: 88px;
    font-size: 30px;
  }
  p:nth-of-type(3) {
    padding: 0px 30px;
    box-sizing: border-box;
    line-height: 88px;
    font-size: 26px;
  }
  p:nth-of-type(4) {
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
    button {
      width: 100%;
      height: 100px;
      background: #eb6100;
      border: none;
      color: #fff;
      font-size: 36px;
    }
  }
}
</style>
