<template>
  <div class="cart">
    <div class="cart-info">
      <h1 class="cart-title">Shopping cart</h1>
      <div class="cart-total-checkout">
        <p class="cart-total" v-if="getTotal">${{getTotal}}</p>
        <p class="cart-total" v-else>The cart is empty</p>
        <button class="checkout">checkout</button>
      </div>
    </div>
    <div class="cart-products-presentation">
      <ul class="cart-products">
        <li class="cart-product" v-for="product in cart" :key="product.prodId">
          <div class="cart-container">
            <div class="cart-product-presentation">
                  <!-- <h2 class="cart-product-type-name">Huile a barbe</h2> -->
                <div class="cart-product-image">
                    <img src="../assets/iphone.png" class="cart-img">
                </div>
                  <h1 class="cart-product-name">{{product.name}}</h1>
            </div>
            <div class="cart-management">
              <div class="cart-option">
                <select id="cart-item-quantity" v-model="qty">
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                </select>
                <p class="cart-product-price" align="right">${{product.price}}</p>
              </div>
              <div class="cart-remove-btn">
                <span class="cart-product-remove">Remove</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-total-container" v-if="getTotal">
      <div class="cart-subtotal space">
        <div class="cart-subtotal-title">Subtotal</div>
        <div class="cart-subtotal-value">$ {{getTotal}}</div>
      </div>
      <div class="cart-taxes">
        <div class="cart-taxes-tvq space">
          <div class="cart-tvq-title">TVQ</div>
          <div class="cart-tvq-value">$ {{getTotal}}</div>
        </div>
        <div class="cart-taxes-tps space">
          <div class="cart-tps-title">TPS</div>
          <div class="cart-tps-value">$ {{getTotal}}</div>
        </div>
      </div>
      <div class="cart-total-total">
          <div class="cart-total-title"  align="left">Total</div>
          <div class="cart-total-value">$ {{getTotal}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState} from 'vuex'
export default {
    name: "Cart",
    data(){
      return {
        qty: 1,
      }
    },
    methods:{
    },
    computed:{
      ...mapGetters({
        // allCartItems: "getCartItems",
        getTotal: "getCartTotal",
      }),
      ...mapState(['cart'])

    }
    
}
</script>

<style>

.cart-products-presentation{
  margin-left: 20%;
  margin-right: 20%;

}
.cart-product-presentation{
  display: flex;
}
.cart-product{
  border-bottom: 1px solid #d6d6d6;

}
.cart-option{
  display: flex;
  flex-direction: row;

}
.cart-product-price{
  margin-left: 100px;
  font-size: 33px;
  font-weight: bold;
}
#cart-item-quantity{
  display: flex;
  align-self: center;
  padding-left: 4px;
  background: transparent;
  width: 45px;
  font-size: 17px;
  border: 1px solid #06c;
  border-radius: 50px;
  height: 20px;
}
.cart-management{
  display: flex;
  flex-direction: column;
}

.cart-product-remove{
  display: flex;
  justify-content: flex-end;
  color: #06c;
  cursor: pointer;
  margin-bottom: 50px;
}
.cart-container{
  display: flex;
  justify-content: space-between;
}
.cart-products{
  list-style: none;
}
/*----------------------------------*/

.cart-product-image{
  margin-top: 20px; 
  margin-right: 20px;
}
.cart-subtotal{
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
}
.cart-subtotal-title{
  margin-left: 45%;

}
.cart-img{
  width: 200px;
  height: 200px;
}
/* .cart-subtotal-value{

}
.cart-taxes{
 
}
*/
.cart-taxes-tvq{
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
}
.cart-tvq-title{
   margin-left: 45%;
}
.cart-taxes-tps{
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;

}
.cart-tps-title{
   margin-left: 45%;
}
.cart-total-total{
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
  padding-top: 35px;
  border-top: 1px solid #d6d6d6;
  margin-left: 47%;
  font-size: 30px;
  font-weight: bold;
}
/* .cart-total-title{

} */
.space{
  margin-bottom: 15px;
}
</style>