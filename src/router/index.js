import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/success/:id",
    name: "Success",
    props: true,
    component: () =>
    import(/* webpackChunckName: "Success" */ "../views/Success.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunckName: "Signup" */ "../views/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunckName: "Login" */ "../views/Login.vue")
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

export default router;
