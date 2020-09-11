<template>
<div class="product-container">
  <div class="product">
      <div class="product-image-description">
          <div class="product-image">
              <img :src="product.url" alt="" class="image">
          </div>
          <div class="product-detail">
            <div class="product-name-price">
              <h1 class="product-name mobile">{{product.name}}</h1>
              <p class="product-price">${{product.price}}</p>
            </div>
            <div class="product-size">
                <h3 align="left" class="product-size-title">Size:
                    <span class="product-size-size">{{product.size}} ml</span>
                </h3>
            </div>

            <div class="product-description-info">
                <p class="product-descrip-info">{{product.info}}</p>
            </div>
            <div class="product-quantity-addtocart">
                <button class="product-addtocart-btn" @click="addCart">
                    <span class="product-addtoCartd-msg">ADD TO CART</span>
                </button>
            </div>
          </div>
      </div>
  </div>

  <div class="product-annexe-products">
      <h2 class="product-annexe-title mobile" align="left" >
          Related products
      </h2>
    <products :category="product.category" class="products-edit"/>
  </div>
    <Review v-bind:prodId="productId"/>
  </div>
</template>

<script>
import Review from './Review'
import {mapState, mapActions, mapMutations} from 'vuex'
import Cookies from "js-cookie"
import dbase from '../assets/firebaseConfig/firebaseInit'
import firebase from 'firebase/app'
import "firebase/database"
import {v4 as uuidv4} from 'uuid'
import products from './Products'
export default {
    name: "Product",


    components:{
        Review,
        products,
    },


    data(){
        return {
            qty: 1,
        }
    },


    props:{
        productId: String,
    },


    methods:{
        ...mapActions({
            retrieveCart: "retrieveCart"
        }),

        ...mapMutations(['addToCart']),

        addCart(){
            let article = this.product;
            console.log("article 1 ",article)
            article = {
                ...article,
                qty: this.qty,
            }
            console.log("article ",article);
            const find = this.cart.find(el => 
                el.prodId === article.prodId
            )
            if(!Cookies.get('collectionId') && !Cookies.get('userId')){
                const uuid = uuidv4();
                Cookies.set('collectionId', uuid, {expires: 7})
                const docId = this.uid ? this.uid : Cookies.get("collectionId");
                let docRef = dbase.collection("cart").doc(docId);
                docRef.set({items:[article]})
            }else if(Cookies.get('collectionId') && !Cookies.get('userId')){
                if(!find){
                    let docRef = dbase.collection("cart").doc(Cookies.get('collectionId'));
                    docRef.update({items: firebase.firestore.FieldValue.arrayUnion(article)})
                }else{
                    console.log('Cookies:', Cookies.get('collectionId'))
                    console.log('Retrieving cart document...')
                    let docRef = dbase.collection("cart");
                    docRef = docRef.doc(Cookies.get('collectionId'));
                    docRef.get().then(snapshot => {
                        let itemToUpdate = snapshot.data().items.find(item => item.prodId === find.prodId);
                        if (!itemToUpdate) {
                            console.log('Missing item in cart items list...');
                            return;
                        }
                        itemToUpdate.qty = Number(itemToUpdate.qty) + 1;
                        docRef.update({items: [
                            ...snapshot.data().items.filter(item => item.prodId !== find.prodId),
                            itemToUpdate
                        ]});
                        console.log('Item quantity updated!')
                    })
                    console.log(docRef)
                }
            } else if(Cookies.get('userId')){
                if(!find && !this.cart.length){
                    let docRef = dbase.collection("cart").doc(Cookies.get('userId'));
                    docRef.set({items:[article]})
                    
                }else if(!find && this.cart.length){
                    dbase.collection('cart').doc(Cookies.get('userId')).update({
                        items: firebase.firestore.FieldValue.arrayUnion(article)
                    })
                }
                else{
                    console.log('Retrieving cart document...')
                    let docRef = dbase.collection("cart");
                    docRef = docRef.doc(Cookies.get('userId'));
                    docRef.get().then(snapshot => {
                        let itemToUpdate = snapshot.data().items.find(item => item.prodId === find.prodId);
                        if (!itemToUpdate) {
                            console.log('Missing item in cart items list... Registered user');
                            return;
                        }
                        itemToUpdate.qty = Number(itemToUpdate.qty) + 1;
                        docRef.update({items: [
                            ...snapshot.data().items.filter(item => item.prodId !== find.prodId),
                            itemToUpdate
                        ]});
                        console.log('Item quantity updated!  Registered user')
                    })
                    console.log(docRef)
                }
            }
            this.$router.push(`/categories/${article.name}/${article.prodId}`)
        }
    },


    computed:{
        ...mapState(['articles', 'cart', 'uid']),
        product(){
            return this.articles.find(el => el.prodId == this.productId);
        },
    },
}
</script>


<style>
.product-container{
    display: grid;
    place-items: center;
}
.product{
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
    margin-top: 150px;
    min-height: 532px;
        display: grid;
    place-items: center;
}
.product-detail{
    margin-left: 100px;
}
.product-image-description{
    display: grid;
    grid-template-columns: auto auto;
    min-width: 300px;
    width: 850px;
}
/*************************************************************************** */
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
.product-price{
    display: flex;
    justify-content: center;
    margin-right: 105px;
}
.product-image-description{
    display: grid;
    place-items: center;
    grid-template-columns: none;
    min-width: 300px;
    width: 850px;
}
.product-detail{
    display: grid;
    place-items: center;
}
.product-name{
    display: flex;
    align-self: center;
    flex-direction: column;
    margin-right: 105px;
    font-size: 15px;

}
.product-description-info{
    display: flex;
    justify-content: center;
    margin-left: 189px;
}
.product-addtocart-btn {
    margin-left: 229px;
}
.product-annexe-title.mobile{
    margin-left: 0;
    text-align: center;
}
.image{
    width: 154px;
    height: 250px;
}
.product-size{
    display: grid;
    place-items: center;
    margin-right: 100px;
}
.product-quantity-addtocart {
    width: 100%;
    margin-left: 20px;
}
.product-image{
    margin: 0 0 20px 0;
    display: grid;
    place-items: center;
}
.product-name-price {
    display: block;
}
}
/**************************************************************************** */
.image{
    width: 200px;
    height: 350px;
}
.product-type-name{
    display: flex;
    justify-content: left;
}
.product-name{
    margin-top: 0;
    display: flex;
}
.product-name-price{
    display: grid;
}
.product-size{
    display: grid;
    justify-content: left;
    border-top: 1px solid #d6d6d6;
    margin-bottom: 15px;
}
.product-price{
    font-size: 24px;
    margin-top: 0;
    text-align: left;
}
.item-list-size{
    display: grid;
    grid-template-columns: auto 70px auto;
    padding-left: 0;
    list-style: none;
}

.product-size-size{
    font-weight: normal;
}
.product-quantity-addtocart{
    display: flex;
    justify-content: left;
    margin-top: 40px;
}
.product-quantity{
    align-self: center;
}
.product-addtocart-btn{
  border: 0.5px solid #0077ed;
  width: 180px;
  height: 50px;
  color: white;
  font-size: 16px;    
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(to right,#fdde5c,#f8ab5e,#f56a62,#a176c8,#759beb,#65beb3,#70db96);
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 50px;
}
.product-addtoCartd-msg{
  background: white;
  border-radius: 25px;
  padding: 12px 32px 12px 27px;
  color: black;
}
#product-cart-item-quantity{
    border: none;
    font-size: 30px;
    background-color: transparent;
    border-radius: 20px;
}
.product-info-list{
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
    padding-left:0;
    list-style: none;
}
.product-image{
    border-bottom: 1px solid #d6d6d6;
}
/************************************************************* */
.product-container{
    display: flex;
    flex-direction: column;
}
.product-annexe-title{
    padding-left: 0;
    margin-left: 100px;
}
.product-annexe-products{
    margin: 0 80px 0 80px;
    padding: 0;
}
.product-description-info{
    display: flex;
    justify-content: left;;
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    margin-right: 40%;
}
</style>