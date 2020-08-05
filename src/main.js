import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {mapState, mapMutations, mapActions} from 'vuex'
Vue.config.productionTip = false;

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  },
});

Vue.directive('rainbow', {
  /*eslint-disable-next-line */
  bind(el, binding, vnode){
    el.style.color = "red";
  }
})
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
  events:{
    closeEvent(){
      this.isActive = false;
    },
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
