import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/nav",
    name: "Nav",
    redirect: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/nav.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/class",
        name: "Class",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/class.vue")
      },
      {
        path: "/appointment",
        name: "Appointment",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/appointment.vue")
      },
      {
        path: "/practice",
        name: "Practice",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/practice.vue")
      },
      {
        path: "/me",
        name: "Me",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/me.vue")
      },
      {
        path: "/setpass",
        name: "Setpass",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/setPass.vue")
      },

      {
        path: "/info",
        name: "Info",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/info.vue")
      }
    ]
  },
  {
    path: "/relogin",
    name: "Relogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/relogin.vue")
  },
  {
    path: "/resetpass",
    name: "Resetpass",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/resetpass.vue")
  },
  {
    path: "/email",
    name: "Email",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/email/toEmail.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/search.vue")
  },
  {
    path: "/set",
    name: "Set",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/set.vue")
  },
  {
    path: "/yi",
    name: "Yi",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/yi.vue")
  },
  {
    path: "/opinion",
    name: "Opinion",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/opinion.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/news.vue")
  },
  {
    path: "/coupon",
    name: "Coupon",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/coupon.vue")
  },
  {
    path: "/study",
    name: "Study",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/study.vue")
  },
  {
    path: "/classOrder",
    name: "ClassOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/classOrder.vue")
  },
  {
    path: "/vipOrder",
    name: "VipOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/vipOrder.vue")
  },
  {
    path: "/appoinOrder",
    name: "AppoinOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/appoinOrder.vue")
  },
  {
    path: "/follow",
    name: "Follow",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/follow.vue")
  },
  {
    path: "/star",
    name: "Star",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/star.vue")
  },
  {
    path: "/category",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/category.vue")
  },
  {
    path: "/classCategory",
    name: "ClassCategory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/classCategory.vue")
  },
  {
    path: "/appoint",
    name: "Appoint",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/appoint.vue")
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/calendar.vue")
  },
  {
    path: "/myStudy",
    name: "Mystudy",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/myStudy.vue")
  },
  {
    path: "/toStudy",
    name: "Tostudy",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tostudy.vue")
  },
  {
    path: "/classmsg",
    name: "Classmsg",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/classmsg.vue")
  },
  {
    path: "/updateInfo",
    name: "UpdateInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/updateInfo.vue")
  },
  {
    path: "/ordermsg",
    name: "Ordermsg",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/ordermsg.vue")
  },
  {
    path: "/vip",
    name: "Vip",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/vip.vue")
  },
  {
    path: "/currency",
    name: "Currency",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/currency.vue")
  },
  {
    path: "/details",
    name: "Details",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/details.vue")
  },
  {
    path: "/video",
    name: "Video",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/video.vue")
  },
  {
    path: "/orderCate",
    name: "OrderCate",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/me/orderCate.vue")
  },
  {
    path: "/examination",
    name: "Examination",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/examination.vue")
  },
  {
    path: "/choice",
    name: "Choice",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/choice.vue")
  },
  {
    path: "/question",
    name: "Question",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/question.vue")
  },
  {
    path: "/roll",
    name: "Roll",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/roll.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/test.vue")
  },
  {
    path: "/err",
    name: "Err",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/err.vue")
  },
  {
    path: "/evaluation",
    name: "Evaluation",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/evaluation.vue")
  },
  {
    path: "/start",
    name: "Start",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/start.vue")
  },
  {
    path: "/detail",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/detail.vue")
  },
  {
    path: "/errList",
    name: "Errlist",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pratice/errList.vue")
  }
];
const router = new VueRouter({
  routes
});

export default router;
