<template>
  <div >
      <router-view></router-view>
      <ul class="jbn_nav">
          <router-link v-for="(item,index) in navList" :key="index" :to="item.url" tag="li">
            <svg class="icon" aria-hidden="true" >
                <use :xlink:href="`#icon-${item.icon}`"></use>
            </svg>
            <p>
                {{ item.txt }}
            </p>
          </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active:0,
        navList:[
            {txt:"首页",url:"/nav",icon:"boshimao",iconactive:"niu1"},
            {txt:"课程",url:"/class",icon:"shubence",iconactive:"liebiao"},
            {txt:"约课记录",url:"/appointment",icon:"dianji-shouzhi",iconactive:"icon-test4"},
            {txt:"练习",url:"/practice",icon:"icon-test3",iconactive:"wode4"},
            {txt:"我的",url:"/me",icon:"wode3",iconactive:"wode4"},
        ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
}
.jbn_nav{
    width:100%;
    height:96px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0px;
    left:0px;
    right:0px;
    background: #fff;
    li{
        flex:1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size:22px;
        align-items: center;
        .icon{
            fill:#b7b7b7;
        }
        svg.icon.active{
            color:#ed831e;
        }
    }
}
</style>
