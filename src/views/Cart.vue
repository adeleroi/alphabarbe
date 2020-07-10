<template>
  <div class="cart">
    <div class="cart-info">
      <h1 class="cart-title">Shopping cart</h1>
      <div class="cart-total-checkout">
        <p class="cart-total" v-if="getTotal">${{bagTotal}}</p>
        <p class="cart-total msge" v-else>The cart is empty</p>
        <button class="cart-checkout-btn" v-if="getTotal">checkout</button>
      </div>
    </div>
    <div class="cart-products-presentation">
      <ul class="cart-products">
        <li class="cart-product" v-for="product in cart" :key="product.prodId">
          <div class="cart-container" v-if="product.prodId">
            <div class="cart-product-presentation">
                  <!-- <h2 class="cart-product-type-name">Huile a barbe</h2> -->
                <div class="cart-product-image">
                    <img src="../assets/iphone.png" class="cart-img">
                </div>
                  <h1 class="cart-product-name">{{product.name}}</h1>
            </div>
            <div class="cart-management">
              <div class="cart-option">
                <select id="cart-item-quantity" v-model="qty" @change="addCart(qty, product)">
                    <option disabled value="" >{{product.qty}}</option>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                </select>
                <p class="cart-product-price" align="right">${{product.price * product.qty}}</p>
              </div>
              <div class="cart-remove-btn">
                <span class="cart-product-remove" @click="remove(product)">Remove</span>
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
          <div class="cart-tvq-value">$ {{getTaxTvq}}</div>
        </div>
        <div class="cart-taxes-tps space">
          <div class="cart-tps-title">TPS</div>
          <div class="cart-tps-value">$ {{getTaxTps}}</div>
        </div>
      </div>
      <div class="cart-subtotal space">
        <div class="cart-subtotal-title">Shipping</div>
        <div class="cart-subtotal-value">FREE</div>
      </div>
      <div class="cart-total-total">
          <div class="cart-total-title"  align="left">Total</div>
          <div class="cart-total-value">$ {{bagTotal}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations} from 'vuex'
import Cookies from "js-cookie"
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import {v4 as uuidv4} from 'uuid'
export default {
    name: "Cart",
    data(){
      return {
        qty: '',
        tps: 0.05,
        tvq: 0.09975,
      }
    },
    methods:{
      ...mapMutations(['removeOneProductFromCart']),
      addCart(quant, prod){
          let article = prod;
          article = {
              ...article,
              qty: Number(quant),
          }
          console.log(this.cart, article.prodId);
          const find = this.cart.find(el => 
              el.prodId === article.prodId
          )
          console.log('find', find);
          if(!Cookies.get('collectionId')){
              const collectionId = uuidv4();
              dbase.collection(collectionId).add(article).then(x => {
                  if(x.id){
                      Cookies.set('collectionId', collectionId, {expires: 7});
                  }
              })
          }else{
              if(!find){
                  dbase.collection(Cookies.get('collectionId')).add(article).then(x => {
                      console.log('addToCart: ', x);
                  })
              }else{
                  dbase.collection(Cookies.get('collectionId'))
                  .doc(find.documentId).update({
                      qty: Number(quant)
                  })
              }
          }
          this.showReviewCart = true;
      },
      remove(prod){
        const found = this.cart.find(el => {
          return el.prodId === prod.prodId;
        })
        dbase.collection(Cookies.get('collectionId'))
        .doc(found.documentId).delete();
        this.removeOneProductFromCart(prod);
        
      }
    },
    computed:{
      ...mapGetters({
        getTotal: "getCartTotal",
        getTaxTvq: "getTaxTvq",
        getTaxTps: "getTaxTps"
      }),
      ...mapState(['cart']),
      bagTotal(){
        return Number.parseFloat(this.getTotal + Number(this.getTaxTvq) + Number(this.getTaxTvq)).toFixed(2);
      }

    }
    
}
</script>

<style>
.cart{
  min-height: 522px;
}
.cart-total{
  font-weight: bold;
  font-size: 20px;
}
.cart-total.msge{
  margin-top: 30px;
}
.cart-checkout-btn{
    background-color:grey;
    /* #444546 */
    background:linear-gradient(#939597,#ce1a0d);
    border: 0.5px solid #939597;
    width: 120px;
    height: 50px;
    color: white;
    font-size: 20px;    
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
  margin-bottom: 50px;
}
.cart-products-presentation{
  margin-left: 10%;
  margin-right: 10%;

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