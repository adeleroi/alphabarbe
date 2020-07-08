import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {mapState, mapMutations, mapActions} from 'vuex'
// import dbStore from "./assets/firebaseConfig/firebaseInit"
// import "firebase/database"
import Cookies from "js-cookie"
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
    ...mapActions(['retrieveArticles', 'retrieveCart']),
    retrieveAll(){
      this.retrieveArticles();
      if(Cookies.get('collectionId')){
        this.retrieveCart();
      }
    }
  },
  computed: {
    ...mapState(['articles', 'cart']),
  },
  created(){
    this.retrieveAll();
  }
}).$mount("#app");
