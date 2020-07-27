<template>
<div class="product-container">
  <div class="product">
      <div class="product-image-description">
          <div class="product-image">
              <img :src="product.url" alt="" class="image">
          </div>
          <div class="product-detail">
            <div class="product-name-price">
              <h2 class="product-type-name">{{product.description}}</h2>
              <h1 class="product-name">{{product.name}}</h1>
              <p class="product-price" align="left">${{product.price}}</p>
            </div>
            <div class="product-size">
                <h3 align="left" class="product-size-title">Size:
                    <span class="product-size-size">{{product.size}} ml</span>
                </h3>
            </div>
            <div class="product-quantity-addtocart">
                <button class="product-addtocart-btn" @click="addCart">
                    <span class="product-addtoCartd-msg">ADD TO CART</span>
                </button>
            </div>
          </div>
      </div>
  </div>
    <Review v-bind:prodId="productId"/>
  </div>
</template>

<script>
import Review from './Review'
import {mapState} from 'vuex'
import Cookies from "js-cookie"
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import {v4 as uuidv4} from 'uuid'
export default {
    name: "Product",
    components:{
        Review,
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
        addCart(){
            let article = this.product;
            article = {
                ...article,
                qty: this.qty,
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
                        qty: Number(find.qty + this.qty)
                    })
                }
            }
            this.$router.push(`/categories/${article.name}/${article.prodId}`)
        }
    },
    computed:{
        ...mapState(['articles', 'cart']),
        product(){
            return this.articles.find(el => el.prodId == this.productId);
        },
    },

}
</script>

<style>

.product{
    display: flex;
    justify-content: center;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
    margin-top: 150px;
    min-height: 532px;
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
.image{
    width: 220px;
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
    justify-content: left;
}
.product-size{
    display: grid;
    justify-content: left;
    border-top: 1px solid #d6d6d6;
}
.product-price{
    font-size: 24px;
    margin-top: 0;
}
.item-list-size{
    display: grid;
    grid-template-columns: auto 70px auto;
    padding-left: 0;
    list-style: none;
}
.product-size-title{
    margin-bottom: 20px;
}
.product-size-size{
    font-weight: normal;
}
.product-quantity-addtocart{
    display: flex;
    justify-content: left;
    margin-bottom: 24px;
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

</style>