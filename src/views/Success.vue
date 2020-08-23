<template>
  <div class="success-container">
    <h1>YOUR ORDER HAS BEEN RECEIVED.</h1>
    <h2>Thank you for your purchase!</h2>
      <button class="success-redirection-btn">
        <router-link :to="{name: 'Home'}">
          <span class="success-redirection-msg">Continue Shopping</span>
        </router-link>
      </button>
  </div>
</template>

<script>
import { mapState,  mapMutations } from 'vuex'
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import Cookies from 'js-cookie'
export default {
    name: "Success",
    props:{
      id: String,
    },
    methods:{
      ...mapMutations(['clearCart']),
        deleteCurrentCart(){
        const collectionId = Cookies.get('userId') || Cookies.get('collectionId');
        console.log(Cookies.get('collectionId'))
        const batch = dbase.batch();
        for(var i = 0; i < this.cart.length; i++){
          const rmv = dbase.collection(collectionId).doc(this.cart[i].documentId);
          batch.delete(rmv);
        }
        batch.commit().then(
          () => {
            this.clearCart;
            if(collectionId == Cookies.get('collectionId'))
              Cookies.remove('collectionId');
          }
        );
      },
    },
    created(){
      this.deleteCurrentCart();
    },
  computed:{
    ...mapState(['cart'])
  }
}
</script>

<style>
.success-container{
  margin-top: 150px;  
  min-height: 523px;
  display: flex;
  flex-direction: column;
  
}
.success-redirection-btn{
  display: flex;
  align-self: center;
  border: 0.5px solid #0077ed;
  width: 220px;
  height: 40px;
  color: white;
  font-size: 16px;    
  justify-content: center;
  border-radius: 20px;
  background: linear-gradient(to right,#fdde5c,#f8ab5e,#f56a62,#a176c8,#759beb,#65beb3,#70db96);
  cursor: pointer;
  margin-top: 20px;
}
.success-redirection-msg{
  background: white;
  border-radius: 35px;
  padding: 7px 35px 7px 35px;
  color: black;
}
</style>