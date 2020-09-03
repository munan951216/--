<template>
  <div class="jbn_content">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in jbnBannerList" :key="index">
        <img :src="item.banner_img" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图结束 -->
    <!-- 导航部分开始 -->
    <ul class="jbn_nav">
      <li @click="goClass">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAFZUlEQVRoQ+1bW2xUVRRd68xMeZPaFESeBkuLhkekk6IfxDEEMQqUmWGMwcQPE5FEo9GYGONP/TIh8UH88BsNwTDObR0CGsUImGDAGVEQIn1JIBYqBSwtr5m5Z5tbaDLYoXPb28d8nPs1ybl7n7PXXWedk8leRN6zfv3pSr/f9wypN4uwlhAheJKQvVnNfblc2fkLFy72ptPBbH5cqf0OhcQ/ZcqJaWVl02dRsmtJrtPQywmQwG+AfJG1M98mk0s7+9dO50dDg6jjx5vrofE2qFYC4htYnPQC6gREpwl1BD5/KpF48DRAKQ0ghNFoexVsvVKAWlCCAJYDmDZwfbQBSYPqo2XLHoo3NFD3AbEp3FKvIZ8CmFesKBE4hfcQuASgTSi7/f7pTfH4AxeLxY7G+MaNV8qV6opSEBVIjQgqSU4FRBWbTwSdCmproqmqibG1Jyv05EBCgFCxwHuNk8hCuF+RO5Dhz7dU9koyWXMNoB5uzsJxomKxi5Ntu7tcCR63oV8g1NOATPAwz8GcrTczGm2Lira/BOD3kOxOaN82+UegjwE4qrRKZcVOJ5OLO7zk3rCh/X6lsisUVJ1QgnSoD84CpI/RHp8ciJcZibRaEB32mGxAuAhyJLodYEB1REQn/P7Md/H4koybuUKhH/0VFfNDgH4eIo8BmCki95EcgQ/2/xWovYyEW/4GZLabxXl/hx0UvHnmXHfjvU6eWEx8OtuyUYhtABZ6n9NNBl5gJNx8tbCyukkwrHe6QLXFsqoaC0WHw+1riNxOADOGlX14Qb0OI256FJuhT00esqxFTxQGonk/gdVDT+op4ta4AEHiWsKqnlpo6ZFwcw+AgmOeSh00mOMFBHXCWlTg0gZEIy22SPE7wMiCYoDoP/YNI24jYRhhGHG3xhhGGEYYRhQ8d83WMFvDbA2zNQa7lBuNMBphNMJohNEIF39dGLE0YmnE0oilEUsjli4QMGJpxNKIpRFLF1JhbpZGLI1YGrE0YmnE0gUC+WI55j1UIEuuUaTHaSY7BeBh9+h5f7MEgWhmJNKyGyIx7+W5zzAYEJFws9OtOxKNpO4XBCQZibRththOO9+YPSXHCGIrY+va5tsB+zCAOWOFRCkBIYIOZfMphkJ/Tawoz34G4kUARTvaRwKsUgHCcRoQ2JHT+vXbNoX69lVa5XaNFStKBQgAl0GELav6UB8QfQ3g5XNfA+XjkfjixXKUChCK8l7X5Y5tBw48mbtLnaPh5u0CbAEwsVgxXsZL4NS4CeJzy6p+pb+Ou4CIxQ5PyuUq3yL4BiCj1hQ+zoz4F4IPc1pvTyYXO+3Ofc+A89oBQzIzH9VKPgBk1Wic6eMEhGOqOQLiHZ9v0i/x+Lwb+ay+58XF8U3YduuzFHlVgKUQTAc5yY1Xqti2GQsg7pwI10H2CORPQH9y9mzNvnSaBR2Krm5wkcipBSKBOooESdQKuAKQ8uGyZRSBcL56twC/UyRFqKOiJGVZ1e1FP06xF/LHa2tTgTlzJlQEAhNna40QgSggdQACQ8kDoNdqrC5gQwSGaVPIkvhVNCz6yr6/caP3fGfnzUtD8ae6YsRgRcZirVW2Lc9BY5NAHLvkNBKDue4cw+QPVlP1mkJ5I+HT3wBcOzjbJCPCq1ToANhIqp2JxMJWLx5Uz0D0F+O4b2eUn1liq1wQIkEI60A8MsAdRLQqW1766uuanwoBEY22BSF6l4hU5Y87ZjkQfxBMQUuKwqNqwq2Tbs1yxRg7YkDkT+ScPJnMzMoyxQU29DpA6gHMFeCYz+d7v6vr7EHnElN4caLC4ZbVhLwL0HH1ngO4F0BSa7ZrPfnSnj2zrxcrbKjj/wFPducAYoibwgAAAABJRU5ErkJggg==" alt="">
        <p>特色课</p>
      </li>
      <li @click="goYi">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAEDElEQVRoQ+2aTWhUVxTH/+fNRyYmE78WirTQFgwiXSjFjWDRlR+k0CIOlJiaVk1VNGrGmBZaOy24EXSmlBqk2inUyaRZKM3MFFxoNt1VQXEhiogSSKwL48ckMTNz7yk3VQntTN7Me2HezJv3tveee+7vnnP+9773LgFAaGjIPZ4eeVsCX4KwCZKXgEhTbRX3EP4mxiXp1b46tfHjYTPzIwX+/PloO4i/AfCGmcHKZcsAa6ALYnKiIxzY9dioX+pOxJZL4Eq1gM8AfeRyy/dPbG67bRg+mIxFwWg3OoBldkTMLFaf+qDthtE5UDDRNwrwUqMDWGnHkKvMwQ/GBAiVKW46K2sePhFjK6NnxrcDb67mncibyT7LbJ20d9LeWPJR0KZq352KLmX2vguX5n+9NDmAmB7kXqTvh7ftHLMlfFeqv5lYXARjZZ6cEAD+AmG/LeGDidhBAJFCxaBejEAYtCV8VzL2NTG+m1UJCE9rFx6AA29so7DeqtAhp6i0dyJvw33eibye2jtp76S99cptZAaO2ud5pXUEzxG82YvJOd4aEZtKsHEEr0YFb0oKXhP+cPvN/2ZhLaj9XUHYGGlpvVcz8OoTFAETID7pn/AeDwUCmfLAT/8Wxp9EuE7M2XKLHhMxMacl+NaLSW/qdCCQzjeHuU97IgbzOZGRx0T92OOp4TpZbvhlzc0cWr9B/VWe9efqnMIzIEAUnwR39ra0jpUbulR/cwf/b8TPC4/siWxqGy11Ilb0nxt4VWPA2Vx26mjko0+fWAFixKdpeJXqBPSJXKazmsCnr9WNj/wiGa16C5f/bK+T6ocuRhdoLs8KaFSv56Cc7STIzRqvJaJOMC/S8/1/eAUO/klkMz35In7093N+ofl6AV4PaC49B2VtZ3U9D00gqgOritV7q0vGnoAxX3UrJtW/+CO+OivkNfX9T2/wSm+nI6l4J0vZw0ATgfpFRhyLbC2s6l2D51uIKFHpYMXMj7YNDHjfdE++xW6PJ+eWwz9s2f5sNkNbwRezQjP7dCV/20Ccu2yLtC8V/lAy9o6LoWp+Qam2lda/ZNHqSJyZ59caf4ZEoNqjXzK8it7h5K/rNNbOMrCcqlj1DcGrPfTwYP97mov3QvJmAEuq8f6uMfiXxbtv4MdGX8PiZaRhviayPstqmqlegrYQcIBR/CVqU/CWwRZwfCQR382QYQDzitEjW8F3XD3jaRpp3AtCiIGFesGxFbyCDQ1FfemJuh2QfFqvBGwH/yrawVTfLkiEAW4oVAK2hVcl4H/o30PM3xYqAdvCqwxoH4r6Fo97PyFGb74SsDX8qxLoTsY/E1J+D0LDjEOZrAn46V1gtPFzxvSV1Je7AN2pCfjXJZCu3wqSx8H8yEXo+Qf3I4hni2PDwwAAAABJRU5ErkJggg==" alt="">
        <p>一对一服务</p>
      </li>
      <li @click="goCalendar">
        <img src="data:image/png;base64,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" alt="">
        <p>学习日历</p>
      </li>
    </ul>
    <!-- 导航部分结束 -->
    <!-- 名师阵容部分开始 -->
    <div class="jbn_teacher">
      <p class="jbn_title">名师阵容</p>
      <ul>
        <li v-for="(item,index) in jbnTeacher" :key="index" @click="goCategory(item.teacher_id)"> 
          <div class="jbn_left">
            <img :src="item.teacher_avatar" alt="">
          </div>
          <div class="jbn_right">
            <p>
              {{ item.teacher_name}}
            </p>
            <p class="jbn_cate">
              {{ item.introduction}}
            </p>
          </div>
        </li>
      </ul>

    </div>
    <!-- 名师阵容部分结束 -->
    <!-- 精品课程部分开始 -->
    <div class="jbn_class">
      <p class="jbn_title">精品课程</p>
      <ul>
        <li v-for="(item,index) in jbnClass" :key="index" @click="goClassCategory(item.id)">
          <img src="../assets/order.png" alt="" class="jbn_biao" v-if="item.has_buy==1">
          <p class="jbn_tit">
            {{ item.title}}
          </p>
          <p class="jbn_periods">
            共{{item.total_periods}}课时
          </p>
          <p v-for="(val,index) in item.teachers_list" :key="index" class="jbn_tea">
            <img :src="val.teacher_avatar" alt="">
            <span>{{ val.teacher_name}}</span>
          </p>
          <div>
            <span>
              {{ item.sales_num}}人已报名
            </span>
            <span v-if="item.price==0">
              {{ item.price==0?"免费":`${ item.price/100}.00`}}
            </span>
            <span v-else style="color:#d02221">
              <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
              {{ item.price==0?"免费":`${ item.price/100}.00`}}
            </span>
          </div>
        </li>
      </ul>
      
    </div>
    <!-- 精品课程部分结束 -->
    <!-- 推荐课程部分开始 -->
    <div class="jbn_class">
       <p class="jbn_title">推荐课程</p>
       <ul>
        <li v-for="(item,index) in jbnRecommend" :key="index" @click="goClassCategory(item.id)">
          <img src="../assets/order.png" alt="" class="jbn_biao" v-if="item.has_buy==1">
          <p class="jbn_tit">
            {{ item.title}}
          </p>
          <p class="jbn_periods">
            共{{item.total_periods}}课时
          </p>
          <p v-for="(val,index) in item.teachers_list" :key="index" class="jbn_tea">
            <img :src="val.teacher_avatar" alt="">
            <span>{{ val.teacher_name}}</span>
          </p>
          <div>
            <span>
              {{ item.sales_num}}人已报名
            </span>
            <span v-if="item.price==0">
              {{ item.price==0?"免费":`${ item.price/100}.00`}}
            </span>
            <span v-else style="color:#d02221">
              <img src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png" alt="">
              {{ item.price==0?"免费":`${ item.price/100}.00`}}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 推荐课程部分结束 -->
    <!-- 明星讲师部分开始 -->
    <div class="jbn_star jbn_recommend">
      <p class="jbn_title">明星讲师</p>
      <ul>
        <li v-for="(item,index) in jbnStar" :key="index" @click="goCategory(item.teacher_id)">
          <div class="jbn_starLeft">
            <img :src="item.teacher_avatar" alt="">
          </div>
          <div class="jbn_starRight">
            <p>
              <span>{{ item.teacher_name}}</span>
              <span>
                {{ item.level_name}}
              </span>
            </p>
            <p>
              {{ item.introduction}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 明星讲师部分结束 -->

    <!-- 邮箱按钮 -->
    <Email></Email>
  </div>
</template>
<script>
import Email from "@/components/email"
// 引入获取轮播图接口
import { getBanners, getTeacher } from "../http/api.js"
export default {
  data() {
    return {
      jbnBannerList: [],
      jbnTeacher:[],//名师阵容
      jbnClass:[],//精品课程
      jbnRecommend:[], //推荐课程
      jbnStar:[]//明星讲师
    };
  },
  created() {},
  mounted() {
    // 调用获取轮播数据
    this.getBanner();
    //
    this.getTitle()
  },
  methods: {
    // 获取轮播
    getBanner(){
      getBanners().then(res=>{
        // console.log(res)
        this.jbnBannerList = res.data.data;
      })
    },
    // 获取名师阵容标题数据
    getTitle(){
      getTeacher().then(res=>{
        // console.log(res)
        this.jbnTeacher=res.data.data[0].list  //名师阵容数据
        this.jbnClass=res.data.data[1].list    //精品课程数据
        this.jbnRecommend=res.data.data[2].list   //推荐课程数据
        this.jbnStar=res.data.data[3].list   //明星讲师数据
        console.log(this.jbnClass)
      })
    },
    // 点击特色课进入课程页面
    goClass(){
      this.$router.push({
        path:"/class"
      })
    },
    // 点击一对一辅导进入一对一辅导页面
    goYi(){
      this.$router.push({
        path:"/yi"
      })
    },
    // 点击进入老师详情页面
    goCategory(id){
      this.$router.push({
        path:"/category",
        query:{
          id:id
        }
      })
    },
    // 点击进入课程详情页面
    goClassCategory(id){
      this.$router.push({
        path:"/classCategory",
        query:{
          id:id
        }
      })
    },
    // 点击进入学习日历页面
    goCalendar(){
      this.$router.push({
        path:"/calendar"
      })
    }
  },
  components:{
    Email
  }
};
</script>

<style scoped lang="scss">
.jbn_content{
  background: #f0f1f3;
}
.my-swipe{
  width:100%;
  height:400px;
  img{
  width:100%;
  height:400px;
  }
}
.jbn_nav{
  position: relative;
  width:100%;
  height:206px;
  display: flex;
  padding:0px 36px;
  box-sizing: border-box;
  justify-content: space-between;
  margin-top:-50px;
  z-index:99999999999999999999999999;
  li{
    width:206px;
    height:206px;
    background: #fff;
    padding:56px 0px;
    box-sizing: border-box;
    border-radius: 15px;
    text-align: center;
    img{
      width:50px;
      height:45px;
    }
    p{
      font-size:22px;
      color:#8e8e8e;
    }
  }
}
// 名师阵容部分布局
.jbn_teacher{
  width:100%;
  padding:10px 20px;
  box-sizing: border-box;
  .jbn_teacher>p{
    font-size:30px;
    width:100%;
    text-align: left;
  }
  ul{
    li{
      height:162px;
      background: #fff;
      border-radius:6px;
      display: flex;
      margin-top:20px;
      padding:30px;
      box-sizing: border-box;
      .jbn_right{
        width:538px;
         text-indent:24px;
      }
      img{
        width:82px;
        height:82px;
        border-radius:50%;
      }
      .jbn_cate{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color:#acacac;
      }
    }
  }
}
.jbn_title{
  text-indent:20px;
  border-left:6px solid #e7662a;
  font-weight: bold;
  font-size:30px;
}
// 精品课程部分布局
.jbn_class{
  width:100%;
  padding:0px 20px;
  box-sizing: border-box;
  ul{
    li{
      background: #fff;
      margin-bottom:30px;
      padding:30px 25px;
      box-sizing:border-box;
      border-radius: 6px;
      position: relative;
      .jbn_biao{
        width:100px;
        height:100px;
        position: absolute;
        top:120px;
        right:40px;
      }
      .jbn_tit{
        font-weight: bold;
        font-size:30px;
      }
      .jbn_periods{
        color:#696969;
        font-size:22px;
      }
      .jbn_tea{
        height:55px;
        display: flex;
        align-items: center;
        img{
          width:55px;
          height:55px;
          border-radius:50%;
        }
        span{
          color:#838383;
          font-size:24px;
          margin-left:16px;
        }
      }
      div{
        width:100%;
        height:58px;
        padding:28px 0px 0px 0px;
        box-sizing: border-box;
        border-top:2px solid #f2f2f2;
        margin-top:30px;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1){
          color:#7d7d7d;
          font-size:24px;
        }
        span:nth-of-type(2){
          color:#6a9352;
          img{
            width:25px;
            height:25px;
          }
        }
      }
    }
  }
}
// 推荐课程部分布局开始
.jbn_recommend{
  padding-bottom:10px;
  box-sizing: border-box;
}
// 明星讲师部分布局开始
.jbn_star{
  width:100%;
  padding:0px 20px;
  box-sizing: border-box;
  margin-bottom:126px;
  ul{
    li{
      padding:40px 30px 30px 30px;
      box-sizing: border-box;
      background: #fff;
      border-radius:6px;
      display: flex;
      margin:10px 0px;
      .jbn_starRight{
        width:525px;
        margin-left:25px;
        p:nth-of-type(1){
          span:nth-of-type(1){
            font-size:28px;
          }
          span:nth-of-type(2){
            font-size:16px;
            color:#e17629;
            margin-left:13px;
          }
        }
        p:nth-of-type(2){
          width:525px;
          color:#bcbcbc;
          font-size:24px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      img{
        width:80px;
        height:80px;
      }
    }
  }
}
</style>
