<template>
  <div class="cart">
    <div class="cart-info">
      <h1 class="cart-title">Shopping cart</h1>
      <div class="cart-total-checkout">
        <p class="cart-total" v-if="getTotal">${{bagTotal}}</p>
        <p class="cart-total msge" v-else>The cart is empty</p>
        <button class="cart-checkout-btn" v-if="getTotal" @click="checkoutRedirect">
          <span class="checkout-btn-apple">checkout</span>
        </button>
      </div>
      <!-- <div class="loading" v-if="!cart.length && !getTotal">Loading...</div> -->
    </div>
    <div class="cart-products-presentation">
      <ul class="cart-products">
        <transition-group name="listtransition" tag="p">
          <li class="cart-product" v-for="product in cart" :key="product.prodId">
            <div class="cart-container" v-if="product.prodId">
              <div class="cart-product-presentation">
                  <div class="cart-product-image">
                      <img :src="product.url" class="cart-img">
                  </div>
                  <div class="cart-product-name">
                    <h1 align="left">{{product.name}}</h1>
                    <h2 align="left">{{product.description}}</h2>
                  </div>
              </div>
              <div class="cart-management">
                <div class="cart-option">
                  <select id="cart-item-quantity" v-model="product.qty" @change="addCart(product)">
                      <option disabled value="" >{{product.qty}}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                  </select>
                  <p class="cart-product-price" align="right">${{product.price * product.qty}}</p>
                </div>
                <div class="cart-remove-btn">
                  <span class="cart-product-remove" @click="remove(product)">Remove</span>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
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
import firebase from 'firebase/app'
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
/* eslint-disable no-undef */
const stripe = Stripe("pk_test_dBcdfrU9L796gmsYfemRUozd00g7LiJ4CS")
/* eslint-enable no-undef */
export default {
    name: "Cart",
    data(){
      return {
        qty: 0,

      }
    },
    methods:{
      ...mapMutations(['removeOneProductFromCart', 'CartItems', 'addToCart']),

      addCart(prod){
          // const find = this.cart.find(el => 
          //     el.prodId === prod.prodId
          // )
          console.log("find",prod)
          if(Cookies.get('collectionId') && !this.uid){
              console.log('Cookies:', Cookies.get('collectionId'))
              console.log('Retrieving cart document...')
              let docRef = dbase.collection("cart");
              docRef = docRef.doc(Cookies.get('collectionId'));
              docRef.get().then(snapshot => {
                  let itemToUpdate = snapshot.data().items.find(item => item.prodId === prod.prodId);
                  if (!itemToUpdate) {
                      console.log('Missing item in cart items list...');
                      return;
                  }
                  itemToUpdate.qty = Number(prod.qty); // Number(itemToUpdate.qty)
                  docRef.update({items: [
                      ...snapshot.data().items.filter(item => item.prodId !== prod.prodId),
                      itemToUpdate
                  ]});
                  console.log('Item quantity updated!')
              })
          }else if(this.uid){
              console.log('Retrieving cart document...')
              let docRef = dbase.collection("cart");
              docRef = docRef.doc(this.uid);
              docRef.get().then(snapshot => {
                  let itemToUpdate = snapshot.data().items.find(item => item.prodId === prod.prodId);
                  if (!itemToUpdate) {
                      console.log('Missing item in cart items list... Registered user');
                      return;
                  }
                  itemToUpdate.qty = Number(prod.qty);
                  docRef.update({items: [
                      ...snapshot.data().items.filter(item => item.prodId !== prod.prodId),
                      itemToUpdate
                  ]});
                  console.log('Item quantity updated!  Registered user')
              })
              console.log(docRef)
          }
      },

      remove(prod){
        const found = this.cart.find(el => {
          return el.prodId === prod.prodId;
        })
        const collectionId = this.getUserEmail? this.uid: Cookies.get('collectionId');
          let docRef = dbase.collection("cart");
          docRef = docRef.doc(collectionId);
          docRef.get().then(snapshot => {
              let itemToUpdate = snapshot.data().items.find(item => item.prodId === found.prodId);
              if (!itemToUpdate) {
                  console.log('Missing item in cart items list... Registered user');
                  return;
              }
              docRef.update({
                items: firebase.firestore.FieldValue.arrayRemove(itemToUpdate)
              });
              console.log('Item removed  Registered user')
          })
          this.removeOneProductFromCart(prod);
      },

      checkoutSessionAndPayment(){
        console.log(this.getCartItems);
        const promesse = fetch("https://stripeserverforkoutoukou.herokuapp.com/create-checkout-session", { 
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.getCartItems)
        })
        .then(x => {
          return x.json();
        })
        return promesse;
      },
      checkoutRedirect(){
        this.checkoutSessionAndPayment().then(data => {
          stripe.redirectToCheckout({
            sessionId: data.sessionId
          });
        })
      }
    },
    computed:{
      ...mapGetters({
        getTotal: "getCartTotal",
        getTaxTvq: "getTaxTvq",
        getTaxTps: "getTaxTps",
        getCartItems: "getCartItems",
        getUserEmail: "getUserEmail"
      }),

      ...mapState(['cart', 'uid']),

      bagTotal(){
        return Number.parseFloat(this.getTotal + Number(this.getTaxTps) + Number(this.getTaxTvq)).toFixed(2);
      }
    },
}
</script>

<style>
.listtransition-enter{
  transition: all ease-in .1s;
}
.listtransition-leave-active {
  opacity: 0;
  transition: all ease-in 1s;
}
.listtransition-leave-active .cart-img {
  transition: all ease-in .3s;
  opacity: 0;
}
.listtransition-leave-active .cart-product-name {
  transition: all ease-in .3s;
  opacity: 0;
}
.cart{
  min-height: 522px;
  margin-top: 100px;
}
.cart-total{
  font-weight: bold;
  font-size: 20px;
}
.cart-total.msge{
  margin-top: 30px;
}

.cart-checkout-btn{
  border: 0.5px solid #0077ed;
  width: 120px;
  height: 50px;
  color: white;
  font-size: 20px;    
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(to right,#fdde5c,#f8ab5e,#f56a62,#a176c8,#759beb,#65beb3,#70db96);
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 50px;
}
.checkout-btn-apple{
  background: white;
  border-radius: 30px;
  padding: 10px 17px 10px 12px;
  color: black;
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
.loading{
  margin-top: 34px;
  font-size: 1.8rem;
}
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
  width: 130px;
  height: 220px;
}
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
.space{
  margin-bottom: 15px;
}
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
.cart-container, .cart-product-presentation{
  flex-direction: column;
}
.cart-product-name{
  font-size: 10px;
  display: grid;
  place-items: center;
}
.cart-option{
  justify-content: space-between;
}
.cart-total-total{
  font-size: 16px;
  margin-bottom: 60px;;
}
.cart-products{
  padding: 0;
}
.cart-product-name > h1{
  margin-bottom: 0;
}
}
</style>