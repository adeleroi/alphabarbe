<template>
  <div class="ask-container">
    <div class="ask-btn-yes-no">
    <h2>Do you want to add the current cart's items to your cart?</h2>
      <button class="ask-btn-yes" @click="addCurrentCartItems">yes</button>
      <button class="ask-btn-yes" @click="addCurrentCartItems">
            <router-link :to="{
        name: 'Home',
      }" class="ask-no-btn">No</router-link></button>
      <!-- <button class="ask-btn-no">no</button> -->

    </div>
  </div>
</template>

<script>
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import {mapGetters, mapState} from 'vuex'

export default {
  name: "Ask",
  methods:{
    addCurrentCartItems(){
      const collectionId = this.getUid || Cookies.get('userId');
      const batch = dbase.batch();
      const tempColId = Cookies.get('collectionId');
      for(var i = 0; i < this.tempCart.length; i++){
        const docId = uuidv4();
        const rmv = dbase.collection(tempColId).doc(this.tempCart[i].documentId);
        const ref = dbase.collection(collectionId).doc(docId);
        batch.set(ref, this.tempCart[i]);
        batch.delete(rmv);
      }
      batch.commit();
      Cookies.remove('collectionId');
      this.$router.push("/");
    }
  },
  computed:{
    ...mapState(['tempCart']),
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
</style>