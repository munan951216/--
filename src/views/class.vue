<template>
  <div class="jbn_content">
    <div class="jbn_top">
        <!-- 顶部开始 -->
    <van-nav-bar title="特色课" @click-right="toSearch">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 顶部结束 -->
    <!-- 下拉选项开始 -->
    <van-dropdown-menu class="jbn_downList">
      <van-dropdown-item title="分类" ref="classify">
        <div class="jbn_classify" v-if="isShow">
          <ul v-for="(item,index) in classify" :key="index">
            <p>{{ item.name}}</p>
            <li >
              <div
                v-for="(val,i) in item.child"     
                :key="i"
                @click="attrclassifyToggle(val.id,i)"
                :class="activeIndex==i?'active':'null'"
              >{{ val.name }}</div>
            </li>
          </ul>
          <p class="jbn_btn">
            <button @click="jbn_reset">重置</button>
            <button @click="jbn_sure">确定</button>
          </p>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="排序" ref="sortList">
        <ul class="jbn_sort">
          <li
            v-for="(item,index) in sortList"
            :key="index"
            @click="sortToggle(item.order_by)"
          >{{item.txt}}</li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item title="筛选" ref="filterList">
        <ul class="jbn_filter">
          <li
            v-for="(item,index) in filterList"
            :key="index"
            @click="screenToggle({course_type:item.course_type,is_vip:item.is_vip})"
          >{{ item.txt}}</li>
        </ul>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉选项结束 -->
    </div>
    
    <!-- 列表部分开始 -->
    <div class="jbn_class">
      <ul>
        <li v-for="(item,index) in classList" :key="index"  @click="goClassCategory(item.id)">
          <img src="../assets/order.png" alt="" class="jbn_biao" v-if="item.has_buy==1">
          <p class="jbn_tit">{{ item.title}}</p>
          <p class="jbn_periods">
            <span>{{ item.start_play_date | dataTime }}~{{ item.end_play_date | dataTime1 }}</span>
            <span>共{{item.total_periods}}课时</span>
          </p>
          <p v-for="(val,index) in item.teachers_list" :key="index" class="jbn_tea">
            <img :src="val.teacher_avatar" alt />
            <span>{{ val.teacher_name}}</span>
          </p>
          <div>
            <span>{{ item.sales_num}}人已报名</span>
            <span v-if="item.price==0">{{ item.price==0?"免费":`${ item.price/100}.00`}}</span>
            <span v-else style="color:#d02221">
              <img
                src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                alt
              />
              {{ item.price==0?"免费":`${ item.price/100}.00`}}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 列表部分结束 -->
    <Email></Email>
  </div>
</template>
<script>
import Email from "@/components/email";
export default {
  data() {
    return {
      isShow: true, //控制下拉开关
      classList: [], //课程列表数据
      classify: [], //课程分类
      attr_val_id: "", //年级分类参数
      // 排序列表
      sortList: [
        { txt: "综合排序", order_by: 1 },
        { txt: "最新", order_by: 2 },
        { txt: "最热", order_by: 3 },
        { txt: "价格从低到高", order_by: 4 },
        { txt: "价格从高到低", order_by: 5 }
      ],
      // 筛选列表
      filterList: [
        { txt: "全部", course_type: 0, is_vip: 0 },
        { txt: "大班课", course_type: 2, is_vip: 0 },
        { txt: "小班课", course_type: 3, is_vip: 0 },
        { txt: "公开课", course_type: 4, is_vip: 0 },
        { txt: "点播课", course_type: 5, is_vip: 0 },
        { txt: "面授课", course_type: 7, is_vip: 0 },
        { txt: "音频课", course_type: 8, is_vip: 0 },
        { txt: "系统课", course_type: 9, is_vip: 0 },
        { txt: "图文课", course_type: 0, is_vip: 0 }
      ],
      featureList: [], //特色课
      order_by: "", //排序
      course_type: "", //筛选课程种类
      is_vip: "", //是否是会员
      page: 1,
      limit: 10,
      flag: true,
      activeIndex:0
    };
  },
  created() {},
  mounted() {
    //   调用获取课程列表数据
    this.getData();
    // 调用获取课程分类
    this.getClassify();
    this.getMore()
  },
  // 路由守卫
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      window.addEventListener("scroll", vm.getMore);
    });
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.getMore);
    next();
  },
  methods: {
    // 获取课程页面数据
    getData(attr_val_id, order_by, course_type, is_vip) {
      let token = localStorage.getItem("token");
      this.$axios({
        url: "https://www.365msmk.com/api/app/courseBasis?",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          DeviceType: "H5",
          Authorization: `Bearer ${token}`
        },
        params: {
          page: this.page,
          limit: this.limit,
          attr_val_id,
          course_type,
          is_vip,
          order_by
        }
      }).then(res => {
        // console.log(res)
        this.classList = res.data.data.list;
        console.log(this.classList)
     
      });
    },
    // 获取课程分类
    getClassify() {
      this.$axios({
        url: "https://www.365msmk.com/api/app/courseClassify?"
      }).then(res => {
        this.classify = res.data.data.attrclassify;
        // console.log(this.classify);
      });
    },
    // 跳转到搜索页面
    toSearch() {
      this.$router.push({
        path: "/search"
      });
    },
    // 年级分类
    attrclassifyToggle(id,i) {
      this.attr_val_id = id;
      this.activeIndex=i
      // console.log(this.attr_id);
      console.log(this.activeIndex)
    },
    // 确定
    jbn_sure() {
      this.page = 1;
      this.limit = 10;
      this.getData(this.attr_val_id, this.order_by, this.course_type, this.is_vip); //获取数据
      this.$refs.classify.toggle(); //下拉菜单开关
    },
    // 重置
    jbn_reset() {
      this.attr_id = ""; //清空id
      this.page = 1;
      this.limit = 10;
      this.getData(this.attr_val_id, this.order_by, this.course_type, this.is_vip); //获取数据
      this.$refs.classify.toggle(); //下拉菜单开关
    },
    // 排序
    sortToggle(order_by) {
      this.page = 1;
      this.limit = 10;
      this.order_by = order_by;
      this.getData(this.attr_val_id, this.order_by, this.course_type, this.is_vip);
      this.$refs.sortList.toggle();
    },
    // 筛选
    screenToggle({ course_type, is_vip }) {
      this.course_type = course_type;
      this.is_vip = is_vip;
      this.page=1;
      this.limit=10;
      this.getData(this.attr_val_id, this.order_by, this.course_type, this.is_vip),
        this.$refs.filterList.toggle();
    },
    // 下拉加载更多
    getMore(){
      if(this.flag==false){
        return false
      }
      let clientHeight=document.documentElement.clientHeight
      let scrollTop=document.documentElement.scrollTop
      let srcollHeight=document.documentElement.scrollHeight
      // console.log(clientHeight,scrollTop,srcollHeight)
      if(clientHeight+scrollTop+170>srcollHeight){
        this.flag=false
        this.$axios({
          url:"https://www.365msmk.com/api/app/courseBasis?",
          params:{
            page:this.page,
            limit:this.limit
          }
        }).then(res=>{
          // console.log(res)
          if(res.data.code==200){
            this.classList.push(...res.data.data.list)
            this.page++
            this.flag=true
          }
        })
      }
    },
    // 点击进入课程详情页面
    goClassCategory(id){
      this.$router.push({
        path:"/classCategory",
        query:{
          id:id
        }
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
.jbn_top{
  width:100%;
  height:200px;
  position: fixed;
  top:0px;
  left:0px;
  right:0px;
  z-index:2;
}
.jbn_content {
  background: #f0f1f3;
}
.van-nav-bar {
  height: 100px;
}
.jbn_title {
  text-indent: 20px;
  border-left: 6px solid #e7662a;
  font-weight: bold;
  font-size: 30px;
}
// 精品课程部分布局
.jbn_class {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  margin-bottom: 96px;
  margin-top:200px;
  ul {
    li {
      background: #fff;
      margin-bottom: 30px;
      padding: 30px 25px;
      box-sizing: border-box;
      border-radius: 6px;
      position: relative;
      .jbn_biao{
        width:100px;
        height:100px;
        position: absolute;
        top:120px;
        right:40px;
      }
      .jbn_tit {
        font-weight: bold;
        font-size: 30px;
      }
      .jbn_periods {
        color: #696969;
        font-size: 22px;
      }
      .jbn_tea {
        height: 55px;
        display: flex;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
        }
        span {
          color: #838383;
          font-size: 24px;
          margin-left: 16px;
        }
      }
      div {
        width: 100%;
        height: 58px;
        padding: 28px 0px 0px 0px;
        box-sizing: border-box;
        border-top: 2px solid #f2f2f2;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          color: #7d7d7d;
          font-size: 24px;
        }
        span:nth-of-type(2) {
          color: #6a9352;
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
  }
}
// 下拉菜单布局开始
/deep/.jbn_downList {
  height: 100px;
}
/deep/.van-dropdown-menu__bar {
  height: 100px;
  font-size: 40px;
  color: #1e1e1e;
}
.jbn_classify {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  ul {
    width: 690px;
    border-bottom: 2px solid #f1f1f1;
    padding: 30px 0px;
    box-sizing: border-box;
    p {
      font-size: 24px;
      color: #5b5b5b;
    }
    li {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      div {
        width: 140px;
        height: 66px;
        background: #f5f5f5;
        line-height: 66px;
        margin-top: 30px;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
}
.jbn_btn {
  width: 690px;
  height: 120px;
  padding: 30px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  button {
    width: 336px;
    height: 62px;
    background: none;
    outline: none;
  }
  button:nth-of-type(1) {
    border: 2px solid #dadada;
    border-radius: 5px;
  }
  button:nth-of-type(2) {
    background: #db692a;
    border-radius: 5px;
    color: #fff;
    border: none;
  }
}
.jbn_sort {
  width: 100%;
  li {
    height: 100px;
    border-top: 1px solid #f5f5f5;
    line-height: 100px;
    text-align: center;
  }
}
.jbn_filter {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 140px;
    height: 66px;
    background: #f5f5f5;
    line-height: 66px;
    margin-top: 30px;
    text-align: center;
    border-radius: 5px;
  }
}
.active{
  background: #ebeefe;
  color:#eb6100;
}
</style>
