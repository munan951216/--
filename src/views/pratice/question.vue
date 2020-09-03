<template>
  <div>
    <!-- 导航栏 -->
    <div class="jbn_nav">
      <van-icon name="arrow-left" color="#737373" @click="show=true"></van-icon>
      <p>
        <van-icon name="underway-o" size="20px"></van-icon>
        <span>{{ count | dataTime6}}</span>
        <van-icon name="apps-o" size="20px" @click="hid=true"></van-icon>
        <van-icon name="star-o" size="20px" @click="getCollect" v-if="star"></van-icon>
        <van-icon name="star" size="20px" @click="cancel" v-else color="orange"></van-icon>
        <van-icon name="todo-list-o" size="20px" @click="isShow=true"></van-icon>
      </p>
    </div>
    <!-- 科目 -->
    <div class="jbn_subject">
      <span v-for="(item,index) in subject" :key="index">{{ item }}</span>
      <p>
        <span>{{ activeIndex+1}}</span>/
        <span>{{questionList.length}}</span>
      </p>
    </div>
    <!-- 题目 -->
    <div v-for="(item,index) in questionList" :key="index" class="jbn_question">
      <div v-if="activeIndex==index">
        <div>
          <p>单选</p>
          {{ index+1 }}、
          <div v-html="item.ques_stem"></div>
        </div>
        <div>
          <div v-for="(val,i) in item.ques_option" :key="i">
            <van-radio-group v-model="radio">
              <van-radio :name="i*1+1"></van-radio>
            </van-radio-group>
            {{ val.id}}.
            <div v-html="val.content"></div>
          </div>
        </div>
        <p class="jbn_btn">
          <button @click="jian(index)">上一题</button>
          <button @click="add(index)" v-if="activeIndex<questionList.length-1">下一题</button>
          <button v-else @click="hid=true">答题卡</button>
        </p>
      </div>
    </div>
    <!-- 点击返回弹出层 -->
    <van-popup v-model="show">
      <div class="jbn_wrapper">
        <p>确定退出？退出后未完成的将不会保存，是否确定</p>
        <p>
          <span @click="show=false">取消</span>
          <span @click="goBack">确定</span>
        </p>
      </div>
    </van-popup>
    <!-- 答题卡开始 -->
    <div class="jbn_sheet" v-if="hid">
      <p class="jbn_nav">
        <van-icon name="arrow-left" @click="hid=false"></van-icon>
        <span>答题卡</span>
        <span></span>
      </p>
      <div class="jbn_subject">
        <span v-for="(item,index) in subject" :key="index">{{ item }}</span>
        <p>
          <span>{{ activeIndex}}</span>/
          <span>{{questionList.length}}</span>
        </p>
      </div>
      <ul class="jbn_lie">
        <li v-for="(item,index) in questionList" :key="index">{{index+1}}</li>
      </ul>
      <p class="jbn_addbtn">
        <button @click="goPapers">交卷并查看答案</button>
      </p>
    </div>
    <!-- 答题卡结束 -->
    <!-- 题目纠错反馈开始 -->
    <div class="jbn_correction" v-if="isShow">
      <p class="jbn_nav">
        <van-icon name="arrow-left" @click="isShow=false"></van-icon>
        <span>题目纠错反馈</span>
        <span></span>
      </p>
      <!-- 纠错类型部分开始 -->
      <div class="jbn_correctionType">
        <p>纠错类型</p>
        <van-radio-group v-model="radio1" direction="horizontal">
          <van-radio name="1">错别字</van-radio>
          <van-radio name="2">答案解析不匹配</van-radio>
          <van-radio name="3">解析错误</van-radio>
          <van-radio name="4">其他</van-radio>
        </van-radio-group>
      </div>
      <!-- 纠错类型部分结束 -->
      <hr />
      <p class="jbn_txt">
        <textarea placeholder="请输入题目纠错信息，最多不超过500个字"></textarea>
      </p>
      <p class="jbn_add">
        <button @click="isShow=false">提交</button>
      </p>
    </div>
    <!-- 题目纠错反馈结束 -->
    <!-- 确认交卷弹出层开始 -->
    <van-popup v-model="papers">
      <div class="jbn_papers">
        <p>确认交卷吗</p>
        <p>
          <span @click="papers=false">取消</span>
          <span @click="goPapers">确认</span>
        </p>
      </div>
    </van-popup>
    <!-- 确认交卷弹出层结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: [],
      questionList: [],
      activeIndex: 0,
      radio: "",
      show: false,
      hid: false,
      isShow:false,
      papers:false,
      userAnswer:[],  //用户答案
      radio1:"",
      count:0,
      id:"",
      star:true,
      collect_id:""
    };
  },
  created() {},
  mounted() {
    this.getTitle();
    this.getQuestion();
    this.goPapers()
    this.setTime()
  },
  methods: {
    //点击返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 计时器
    setTime(){
      let timer=setInterval(()=>{
        this.count++
      },1000)
    },
    // 获取科目
    getTitle() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/point/info/${this.$route.query.id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res);
        this.subject = res.data.data;
        // console.log(this.subject);
      });
    },
    getQuestion() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/examPoint/questions/${this.$route.query.id}/${this.$route.query.parent_id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res);
        this.questionList = res.data.data;
        console.log(this.questionList);
      });
    },
    // 点击下一题切换题目
    add(i) {
      if (this.activeIndex == this.questionList.length) {
        return false;
      }
      this.activeIndex = i + 1;
    },
    // 点击上一题切换题目
    jian(i) {
      if (this.activeIndex == 0) {
        return false;
      }
      this.activeIndex = i - 1;
    },
    // 点击收藏将题目进行收藏
    getCollect() {
      let token = localStorage.getItem("token");
       this.id=this.questionList[this.activeIndex].id
      //  console.log(this.id)
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
          this.star=false
        }
        // console.log(res)
      })
    },
    // 取消收藏
    cancel(){
       let token = localStorage.getItem("token");
       this.collect_id=this.questionList[this.activeIndex].collect_id
       this.$axios({
         url:`https://www.365msmk.com/api/app/collect/cancel/${this.collect_id}/3`,
         method:"PUT",
         headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
       }).then(res=>{
        //  console.log(res)
         if(res.data.code==200){
           this.star=true
         }
       })
    },

    // 交卷
    goPapers(){
      let token = localStorage.getItem("token");
      // this.papers=true
      this.$axios({
        url:"https://www.365msmk.com/api/app/exam/point/storeReport",
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params:{
          paper_id: 44
        }
      }).then(res=>{
        console.log(res)
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
  padding: 0px 30px;
  display: flex;
  align-items: center;
  height: 88px;
  box-sizing: border-box;
  border-bottom: 3px solid #f4f5f7;
  justify-content: space-between;
  p {
    width: 420px;
    display: flex;
    justify-content: space-between;
  }
}
.jbn_subject {
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  border-bottom: 3px solid #f4f6f8;
  align-items: center;
  display: flex;
  height: 86px;
  justify-content: space-between;
  color: #616a74;
  p {
    span:nth-of-type(1) {
      color: #0e98fa;
      font-size: 34px;
    }
  }
}
.jbn_question {
  width: 100%;
  > div {
    padding: 50px 30px;
    box-sizing: border-box;
    div:nth-of-type(1) {
      display: flex;
      p {
        width: 82px;
        height: 36px;
        background: #0097fa;
        color: #fff;
        font-size: 24px;
        text-align: center;
        line-height: 36px;
        border-radius: 10px 0px 10px 0px;
      }
    }
    div:nth-of-type(2) {
      > div {
        display: flex;
        > div {
          display: flex;
          align-items: center;
          /deep/ .van-radio {
            width: 45px;
            height: 45px;
          }
          /deep/ .van-radio__icon {
            width: 45px;
            height: 45px;
          }
          /deep/ .van-icon {
            width: 45px;
            height: 45px;
          }
          /deep/ .van-icon-success {
            width: 45px;
            height: 45px;
          }
          div {
            font-size: 26px;
          }
        }
      }
    }
    .jbn_btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      button {
        width: 175px;
        height: 60px;
        border: 3px solid #dfdfdf;
        border-radius: 10px;
        color: #78776f;
        font-size: 28px;
        background: none;
      }
    }
  }
}
.jbn_wrapper {
  width: 640px;
  height: 315px;
  background: #fff;
  border-radius: 15px;
  p:nth-of-type(1) {
    width: 100%;
    height: 215px;
    padding: 70px 80px;
    box-sizing: border-box;
    text-align: center;
    font-size: 30px;
    color: #717171;
  }
  p:nth-of-type(2) {
    width: 100%;
    height: 100px;
    border-top: 2px solid #fafafb;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: center;
      font-size: 36px;
    }
    span:nth-of-type(1) {
      border-right: 4px solid #fafafa;
      color: #787878;
    }
    span:nth-of-type(2) {
      color: #ef7e2e;
    }
  }
}
.jbn_sheet {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  background: #fff;
  font-size: 34px;
}
.jbn_lie {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 75px;
    height: 75px;
    border: 3px solid #ededed;
    border-radius: 50%;
    line-height: 75px;
    text-align: center;
    color: #c0c0c0;
    font-size: 26px;
    margin-left: 32px;
    margin-right: 32px;
    margin-top: 30px;
  }
}
.jbn_addbtn {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  color: #fff;
  font-size: 26px;
  button {
    width: 100%;
    height: 100px;
    background: #eb6100;
    color: #fff;
    font-size: 26px;
    border: none;
  }
}
.jbn_correction {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #fff;
}
.jbn_correctionType {
  width: 100%;
  height: 240px;
  padding: 30px;
  box-sizing: border-box;
  p {
    font-size: 26px;
    color: #a0a0a0;
  }
}
/deep/ .van-radio-group {
  height: 105px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 105px;
}
/deep/ .van-radio-group {
  // display: inline-block;
  height: 50px;
  font-size: 30px;
  margin-right: 20px;
}
/deep/ .van-radio {
  height: 50px;
}
hr {
  width: 100%;
  height: 24px;
  background: #f0f2f5;
  border: none;
}
.jbn_txt {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  textarea {
    width: 690px;
    height: 365px;
    border: 4px solid #e3e3e3;
    border-radius: 10px;
  }
}
.jbn_add {
  width: 100%;
  height: 88px;
  padding: 0px 30px;
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  left: 0px;
  button {
    width: 100%;
    height: 86px;
    border: 3px solid #41b1fb;
    border-radius: 10px;
    color: #29a7fa;
    font-size: 36px;
    background: none;
  }
}
.jbn_papers {
  width: 635px;
  height: 270px;
  p:nth-of-type(1) {
    width: 635px;
    height: 170px;
    text-align: center;
    line-height: 170px;
    font-size: 30px;
    color: #8f8f8f;
  }
  p:nth-of-type(2) {
    width: 635px;
    height: 100px;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      text-align: center;
    }
    span:nth-of-type(1) {
      color: #7e7e7e;
      font-size: 30px;
    }
    span:nth-of-type(2) {
      color: #f0853a;
      font-size: 30px;
      border-left: 2px solid #f9fafb;
    }
  }
}
</style>
