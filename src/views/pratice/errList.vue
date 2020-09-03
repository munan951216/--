<template>
  <div>
    <div class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack" size="20px"></van-icon>
      <p>
        <van-icon name="apps-o" size="20px" @click="hid=true"></van-icon>
        <!-- <van-icon name="star" size="20px" color="orange" ></van-icon> -->
        <van-icon name="star-o" size="20px"></van-icon>
        <van-icon name="todo-list-o" size="20px" @click="isShow=true"></van-icon>
      </p>
    </div>
    <!-- 错误题目开始 -->
    <div class="jbn_info">
      <p>{{name}}</p>
      <p>
        <span>{{activeIndex+1}}</span>
        <span>/{{errList.length}}</span>
      </p>
    </div>
    <!-- 错误题目结束 -->
    <!-- 错误题目开始 -->
    <div class="jbn_errques">
      <div class="jbn_quesList" v-for="(item,index) in errList" :key="index">
        <div v-if="activeIndex==index">
          <div class="jbn_ques">
            <p>{{item.ques_type==1?"单选":"多选"}}</p>
            {{ index*1+1}}.
            <div v-html="item.ques_stem_text"></div>
          </div>
          <div class="jbn_ana" v-for="(val,i) in item.ques_option" :key="i">
            <input type="radio" />
            {{ val.id}}.
            <div v-html="val.content"></div>
          </div>
          <p class="jbn_change">
            <button @click="add(index)">上一题</button>
            <button @click="jian(index)" v-if="activeIndex<errList.length-1">下一题</button>
            <button @click="hid=true" v-else>答题卡</button>
          </p>
          <p class="jbn_change">
            <button @click="show=true">移除错题</button>
            <button>查看答案</button>
          </p>
        </div>
      </div>
    </div>
    <!-- 错误题目结束 -->
    <!-- 答题卡开始 -->
    <div class="jbn_sheet" v-if="hid">
      <p class="jbn_nav">
        <van-icon name="arrow-left" @click="hid=false"></van-icon>
        <span>答题卡</span>
        <span></span>
      </p>
      <div class="jbn_subject">
        <span>
          {{name}}
        </span>
        <p>
          <span>{{ activeIndex}}</span>/
          <span>{{errList.length}}</span>
        </p>
      </div>
      <ul class="jbn_lie">
        <li v-for="(item,index) in errList" :key="index">{{index+1}}</li>
      </ul>
      <p class="jbn_addbtn">
        <button >结束巩固</button>
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
      <div class="jbn_correctionType" v-if="isShow">
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
    <!-- 移除错题弹框开始 -->
    <van-popup v-model="show">
      <div class="jbn_wrapper">
        <p>确定要将本题移除错题吗？</p>
        <p>
          <span @click="show=false">取消</span>
          <span @click="del">确定</span>
        </p>
      </div>
    </van-popup>
    <!-- 移除错题弹框结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      timer: "",
      name: "",
      errList: [],
      activeIndex: 0,
      hid:false,
      isShow:false,
      radio1:"",
      show:false,
      ques_id:""
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.timer = this.$route.query.timer;
    this.name = this.$route.query.name;
    this.getErr();
  },
  methods: {
    //   点击返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    //   获取错题信息
    getErr() {
      let token = localStorage.getItem("token");
      this.$axios({
        url: `https://www.365msmk.com/api/app/myExam/errorRecord/${this.id}/${this.timer}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        //   console.log(res)
        this.errList = res.data.data;
        console.log(this.errList);
      });
    },
    // 点击上一题切换到上一题
    add(i) {
      console.log(i);
      if (this.activeIndex == 0) {
        return false;
      }
      this.activeIndex = i - 1;
    },
    jian(i) {
      this.activeIndex = i + 1;
      if (this.activeIndex === this.errList.length) {
        
        return false;
      }
    },
    // 移除错题
    del(){
      this.show=false
      this.ques_id=this.errList[this.activeIndex].id
      let token = localStorage.getItem("token");
      this.$axios({
        url:`https://www.365msmk.com/api/app/myExam/detach/${this.ques_id}?`,
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        }
      }).then(res=>{
        console.log(res)
        this.$toast("移除成功")
        // if(res.data.code==200){
        //   this.$router.push({
        //     path:"/err"
        //   })
        // }
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
  border-bottom: 2px solid #fafbfb;
  padding: 0px 30px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: space-between;
  p {
    width: 200px;
    display: flex;
    justify-content: space-between;
  }
}
.jbn_info {
  width: 100%;
  height: 80px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f4f4f4;
  font-size: 30px;
  justify-content: space-between;
  p:nth-of-type(1) {
    color: #665f56;
  }
  p:nth-of-type(2) {
    span:nth-of-type(1) {
      color: #008ffa;
      font-size: 30px;
    }
    span:nth-of-type(2) {
      color: #7a729f;
      font-size: 24px;
    }
  }
}
.jbn_errques {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.jbn_ques {
  display: flex;
  p {
    width: 80px;
    height: 40px;
    background: #0097fa;
    text-align: center;
    line-height: 40px;
    border-radius: 15px 0px 15px 0px;
    color: #fff;
  }
}
.jbn_ana {
  display: flex;
  align-items: center;
}
.jbn_change {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  button {
    width: 180px;
    height: 60px;
    border-radius: 10px;
    background: none;
    border: 2px solid #dfdfdf;
    color: #686a6d;
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
.jbn_subject{
  width:100%;
  height:88px;
  padding:0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items:center;
  justify-content: space-between;
  border-bottom:2px solid #f4f4f4;
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
.jbn_correction {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #fff;
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
</style>
