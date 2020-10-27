import Vue from "vue";
import App from "./App.vue";
import VueSimpleAlert from "vue-simple-alert";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));

import VueAxios from "vue-axios";
import axios from "axios";
import VueCookies from "vue-cookies";

import { BFormSelect } from "bootstrap-vue";
Vue.component("b-form-select", BFormSelect);
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import { BButtonGroup } from "bootstrap-vue";
Vue.component("b-button-group", BButtonGroup);

import routes from "./routes";
import VueRouter from "vue-router";
// import { ButtonGroupPlugin } from 'bootstrap-vue'
// Vue.use(ButtonGroupPlugin)
Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(VueSimpleAlert);

axios.defaults.withCredentials = true;
const router = new VueRouter({
  routes,
});

console.log("enter shared_data");
const shared_data = {
  BASE_URL: "http://localhost:4000",
  username: localStorage.username,
  recipePage: "",
  // lastWatch: localStorage.watchedList,
  familyList: [],
  myRecipesList: [],
  watchedList: [],
  favoriteList: [],

  // addWatchedList(watchedList) {
  //   localStorage.setItem("watchedList", watchedList);
  //   this.lastWatch = watchedList;
  // },

  // addFamilyList(familyList) {
  //   localStorage.setItem("familyList", familyList);
  //   // this.lastWatch = familyList;
  // },

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    Vue.$cookies.remove("session");
    localStorage.removeItem("username");
    // localStorage.removeItem("loadRecipes");
    // localStorage.removeItem("query");
    // localStorage.removeItem("amount");
    // localStorage.removeItem("diet");
    // localStorage.removeItem("cuisine");
    // localStorage.removeItem("intolerance");
    this.username = undefined;
    // localStorage.removeItem("watchedList");
    // localStorage.removeItem("favoriteList");
    // this.lastWatch = undefined;
    this.familyList = [];
    this.myRecipesList = [];
    this.watchedList = [];
    this.favoriteList = [];

    // if (localStorage.watchedList) {
    //   localStorage.removeItem("watchedList");
    // }
    // if (localStorage.favoriteList) {
    //   localStorage.removeItem("favoriteList");
    // }
    if (localStorage.search) {
      localStorage.removeItem("search");
    }
  },
  // search(recipes){
  //   console.log("search");
  //   localStorage.setItem("recipes", recipes);
  //   this.recipes = recipes;
  //   // console.log("search", this.recipes);
  //   // localStorage.setItem("query", query);
  //   // this.query = query;
  //   // console.log("search", this.query);
  //   // localStorage.setItem("amount", amount);
  //   // this.amount = amount;
  //   // console.log("search", this.amount);
  //   // localStorage.setItem("cuisine", cuisine);
  //   // this.cuisine = cuisine;
  //   // console.log("search", this.cuisine);
  //   // localStorage.setItem("diet", diet);
  //   // this.diet = diet;
  //   // console.log("search", this.diet);
  //   // localStorage.setItem("intolerance", intolerance);
  //   // this.intolerance = intolerance;
  //   // console.log("search", this.intolerance);
  // }
};

// console.log(shared_data.familyList);

router.beforeEach((to, from, next) => {
  // if there was a transition from logged in to session expired or localStorage was deleted

  // if we try to enter auth required pages and we are not authorized
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }

    // if the route requires Authorization, (and we know the user is not authorized), we redirect to login page
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});

// Vue.prototype.$root.store = shared_data;

// router.beforeEach((to, from, next) => {
//   console.log(shared_data.username === undefined, !Vue.$cookies.get("session"));
//   // if the user was logged in and than the cookie expired: if in global storage there is a username but there is no cookie
//   if ((shared_data.username === undefined && Vue.$cookies.get("session")) || (shared_data.username !== undefined && !Vue.$cookies.get("session")))
//  {
//     shared_data.logout();
//     if (to.name !== "login") next({ name: "main" });
//     else next();
//   } else {
//     next();
//   }
//   // console.log(123, Vue.$cookies.keys());
//   // console.log(VueCookie);
// });

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
