<template>
  <div class="ask-container">
    <h1>Do you want to add the current cart's items to your cart?</h1>
    <div class="ask-btn-yes-no">
      <button class="ask-btn-yes" @click="addCurrentCartItems">yes</button>
      <!-- <button class="ask-btn-no">no</button> -->
      <router-link :to="{
        name: 'Home',
      }">No</router-link>
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
      console.log(collectionId);
      const batch = dbase.batch();
      console.log(this.tempCart.length);
      for(var i = 0; i < this.tempCart.length; i++){
        const docId = uuidv4();
        const ref = dbase.collection(this.getUid).doc(docId);
        console.log("ref",ref);
        // console.log(this.getCartItems);
        batch.set(ref, this.tempCart[i]);
      }
      batch.commit();
      this.$router.push("/");
    }
  },
  computed:{
    ...mapState(['tempCart']),
    ...mapGetters(['getCartCount', 'getCartItems', 'getUid'])
  }

}
</script>

<style>
.ask-container{
  min-height: 432px;
  margin-top: 200px;
}
.ask-btn-yes-no{

}
.ask-btn-yes{

}
.ask-btn-no{

}
</style>