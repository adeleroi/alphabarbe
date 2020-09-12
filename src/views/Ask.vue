<template>
  <div class="ask-container">
    <div class="ask-btn-yes-no">
    <h2 class="ask-question">Do you want to add the current cart's items to your cart?</h2>
      <button class="ask-btn-yes" @click="addCurrentCartItems">yes</button>
      <button class="ask-btn-yes" @click="continueWithNewCart">
            <!-- <router-link :to="{
        name: 'Home',
      }" class="ask-no-btn"> -->
      No
      <!-- </router-link> -->
      </button>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import Cookies from 'js-cookie'
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: "Ask",
  
  
  methods:{
    ...mapMutations({
      clearCart: 'clearCart'
    }),
      ...mapActions({
        retrieveUserInfo: "retrieveUserInfo"
      }),
    
    addCurrentCartItems(){
      const documentId = this.getUid || Cookies.get('userId');
      const batch = dbase.batch();
      const ref = dbase.collection('cart').doc(documentId);
      this.tempCart.forEach((el, index) => {
        if(!index && !this.cart.length){
          console.log("je set")
          batch.set(ref, {items: [el]});
        }else{
          console.log("j'update")
          batch.update(ref, {items: firebase.firestore.FieldValue.arrayUnion(el)})
        }
      })
      batch.commit().then(() => {
        this.retrieveUserInfo();
      })
      dbase.collection('cart').doc(Cookies.get('collectionId')).delete().then((x) => {
        console.log("deleting...", x);
      });
      Cookies.remove('collectionId');
      this.retrieveUserInfoAndCart;
      this.$router.push("/");
    },
 
    continueWithNewCart(){
      // this.clearCart;
      this.$router.push("/");
    }
  },


  computed:{
    ...mapState(['tempCart', 'cart']),
    ...mapGetters(['getCartCount', 'getCartItems', 'getUid'])
  },
}
</script>

<style>
.ask-container{
  min-height: 432px;
  display: grid;
  place-items: center;
}

.ask-btn-yes {
    border-radius: 5px;
    width: 100px;
    color: white;
    background-color: #2c3e50;
    border: 1px solid #2c3e50;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    margin-right: 5px;
}
.ask-btn-no{
    border-radius: 5px;
    width: 100px;
    color: white;
    background-color: #2c3e50;
    border: 1px solid #2c3e50;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
    margin-left: 5px;
}
.router-link-active.ask-no-btn{
  color: white;
}
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
  .ask-question{
    font-size: 14px;
  }
  .ask-btn-yes {
    width: 40px;
    height: 20px;
    font-size: 12px
  }
}
</style>