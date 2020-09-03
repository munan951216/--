<template>
  <div class="jbn_content">
    <p class="jbn_nav">
      <van-icon name="arrow-left" @click="goBack"></van-icon>
      <span>修改个人信息</span>
      <span @click="add">保存</span>
    </p>
    <div class="jbn_choice">
      <p v-for="(item,index) in list" :key="index" @click="change(index,item)">
        <span>
            {{ item }}
        </span>
        <span v-if="show==index">√</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        show:3,
        list:["男","女"],
        val:""
    };
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    change(i,val){
        // console.log(i)
        this.show=i
        // console.log(val)
        this.val=val
    },
    add(){
        this.$router.push({
            path:"/info",
            query:{
                val:this.val
            }
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
  height: 88px;
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  border-bottom: 2px solid #f4f4f4;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  font-size: 34px;
}
.jbn_choice{
    width:100%;
    padding:0px 20px;
    box-sizing: border-box;
    margin-top:20px;
    background: #fff;
    p{
        height:100px;
        line-height:100px;
        display: flex;
        justify-content: space-between;
        padding:0px 10px;
        box-sizing: border-box;
        span:nth-of-type(2){
            color:orange;
            font-weight: bold;
        }
    }
    p:nth-of-type(1){
        border-bottom: 1px solid #f4f4f4;
    }
}
</style>
