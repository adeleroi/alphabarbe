<template>
  <div class="cart">
    <h1 class="cart-title">Welcome to the cart</h1>
    <ul class="cart-list">
      <li class="cart-item" v-for="item in dat" :key="item.id">{{item.name}}</li>
    </ul>

    <div class="cart-total-checkout">
      <p class="cart-total" v-if="getTotal">${{getTotal}}</p>
      <p class="cart-total" v-else>The cart is empty</p>
      <button class="checkout">checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
    name: "Cart",
    data(){
      return {
        dat: this.$root.tempCart,
      }
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

</style>