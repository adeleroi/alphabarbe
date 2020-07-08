<template>
  <div class="cart">
    <h1 class="cart-title">Welcome to the cart</h1>
    <ul class="cart-list">
      <li class="cart-item" v-for="product in products" :key="product.prodId">{{product.name}}</li>
    </ul>

    <div class="cart-total-checkout">
      <p class="cart-total" v-if="getTotal">${{getTotal}}</p>
      <p class="cart-total" v-else>The cart is empty</p>
      <button class="checkout">checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState} from 'vuex'
export default {
    name: "Cart",
    data(){
      return {
        products: this.cart,
      }
    },
    methods:{
      ...mapState(['cart'])
    },
    computed:{
      ...mapGetters({
        // allCartItems: "getCartItems",
        getTotal: "getCartTotal",
      }),
    }
    
}
</script>

<style>
.cart{
  background-color: #f5f5f7;
}
</style>