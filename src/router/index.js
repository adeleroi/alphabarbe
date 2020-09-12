import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
import Cookies from 'js-cookie';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/article/:slug/:id",
    name: "Article",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Article" */ "../views/Article.vue")
    
  },
  {
    path: "/articles/:slug",
    name: "Articles",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Articles" */ "../views/Articles.vue")
  },
  {
    path: "/categories/:slug/:id",
    name: "Categories",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Categories" */ "../views/Categories.vue")
    
  },
  {
    path: "/cart",
    name: "Cart",
    props: true,
    component: () => 
      import(/* webpackChunkName: "Cart" */ "../views/Cart.vue") 
  },
  {
    path: "/ask",
    name: "Ask",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    props: true,
    component: () =>
      import(/* webpackChunkName: "ask" */ "../views/Ask.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/success/:id",
    name: "Success",
    props: true,
    component: () =>
    import(/* webpackChunckName: "Success" */ "../views/Success.vue")
  },

  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunckName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunckName: "Signup" */ "../views/Signup.vue")
  },
  {
    path: "*",
    name: "Errorpage",
    component: () => 
      import(/* webpackChunkName: "Errorpage" */ "../views/Errorpage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.state.uid && Cookies.get('collectionId')){
      next();
    }else{ 
      console.log("from will")
      router.push(from.fullPath)
    }
  }else{
    next(); // continue with the regular flow;
  }
})

export default router;
