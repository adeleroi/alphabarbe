<template>
<div class="product-container">
      <div class="product reviewcart" v-if="showReviewCart">
          <div class="product-image review-image">
              <img src="../assets/iphone.png" alt="" class="image review">
          </div>
          <div class="product-detail review-detail">
            <div class="product-name-price review-name-price">
                <h2 class="product-type-name review-type-name">Huile a barbe</h2>
                <h1 class="product-name review-name">{{product.name}}</h1>
                <p class="product-price review-price" align="left">${{product.price}}</p>
            </div>
          </div>
          <div class="product-addtocart-btn review-btn">
              <router-link :to="{
                  name: 'Cart',
                  params: {slug: productId}
              }" class="product-review-link">
              <span class="product-addtoCartd-msg review-msg">Review Cart</span>
              </router-link>
          </div>
      </div>
  <div class="product">
      <div class="product-image-description">
          <div class="product-image">
              <img src="../assets/iphone.png" alt="" class="image">
          </div>
          <div class="product-detail">
            <div class="product-name-price">
              <h2 class="product-type-name">Huile a barbe</h2>
              <h1 class="product-name">{{product.name}}</h1>
              <p class="product-price" align="left">${{product.price}}</p>
            </div>
            <div class="product-size">
                <h3 align="left" class="product-size-title">Size</h3>
                <ul class="item-list-size">
                    <li class="item-size">120 ml</li>
                    <li class="item-size">300 ml</li>
                    <li class="item-size">550ml</li>
                </ul>
            </div>
            <div class="product-quantity-addtocart">
                <div class="product-quantity">
                    <!-- <label for="">Qty: </label> -->
                    <select id="product-cart-item-quantity" v-model="qty">
                        <option >1</option>
                        <option >2</option>
                        <option >3</option>
                        <option >4</option>
                    </select>
                </div>
                <div class="product-addtocart-btn" @click="addCart">
                    <span class="product-addtoCartd-msg">ADD TO CART</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-description">
                    <div class="product-id">
                        <p align=left>Product: {{product.prodId}}</p>
                        <p align="left">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore modi possimus nemo culpa ut labore commodi sint est quae autem?</p>
                        <ul class="product-info-list">
                            <li class="info" align="left">- Lorem ipsum dolor sit amet consectetur.</li>
                            <li class="info" align="left">- Lorem ipsum dolor sit amet consectetur.</li>
                            <li class="info" align="left">- Lorem ipsum dolor sit amet consectetur.</li>
                            <li class="info" align="left">- Lorem ipsum dolor sit amet consectetur.</li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookies from "js-cookie"
import dbase from '../assets/firebaseConfig/firebaseInit'
import "firebase/database"
import {v4 as uuidv4} from 'uuid'
export default {
    name: "Product",
    data(){
        return {
            qty: 1,
            showReviewCart: false,
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
                        qty: Number(this.qty)
                    })
                }
            }
            this.showReviewCart = true;
        }
    },
    computed:{
        ...mapState(['articles', 'cart']),
        product(){
            return this.articles.find(el => el.prodId == this.productId);
        },
    }
}
</script>

<style>
.product{
    display: flex;
    justify-content: center;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
    margin-top: 100px;
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
    width: 350px;
    height: 500px;
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
    margin-bottom: 0;
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
    /* background-color: black; */
    background-color:grey;
    background:linear-gradient(#939597,#444546);
    border: 0.5px solid #939597;
    width: 150px;
    height: 60px;
    color: white;
    display: flex;
    justify-content: center;
    /* padding-top: 20px; */
    border-radius: 10px;
    cursor: pointer;
    /* margin-left: 25px; */
}
.product-addtoCartd-msg{
    display: flex;
    justify-self: center;
    margin-top: 20px;
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
.product-review-link{
    text-decoration: none;
    color: white;
}
/*----------------------*/
.product.reviewcart{
    background-color: whitesmoke;
    width: 100%;
    height: 15%;
}
.image.review{
    width: 74px;
    height: 85px;
}
.product-addtocart-btn.review-btn{
    display: flex;
    align-self: center;
    width: 150px;
    height: 28px;
    font-size: 14px;
    margin-left: 60px;
    background-color:grey;
    background:linear-gradient(#939597,#444546);
    border: 0.5px solid #939597;
    border-radius: 5px;

}
.product-addtoCartd-msg.review-msg{
    display: flex;
    align-self: center;
    margin-top: 4px;
}
.product-detail.review-detail{
    margin-left: 20px;
}
.product-type-name.review-type-name{
    font-size: 12px;
}
.product-name.review-name{
    font-size: 12px;
}
.product-price.review-price{
    font-size: 12px;
}
.product-image.review-image{
    border-bottom: none;
}
</style>