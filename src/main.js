import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {mapState, mapMutations, mapActions} from 'vuex'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  data(){
    return {
      qty: 0,
      tempCart: new Set(),
    }
  },
  methods:{
    ...mapMutations(['addToCart']),
    ...mapActions(['retrieveArticles', 'retrieveCart', 'retrieveUserInfo']),

  },
  computed: {
    ...mapState(['articles', 'cart']),
  },
  created(){
    this.retrieveArticles();
    this.retrieveUserInfo();
    // this.retrieveCart();

  }
}).$mount("#app");
