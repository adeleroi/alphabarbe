<template>
  <div class="categories-container">
      <h3 class="categories-liquor" align="left">Category: {{product.category}}</h3>
    <div class="reviewcart">
        <div class="product-image review-image">
              <img :src="product.url" alt="" class="image review">
        </div>
        <div class="product-detail review-detail">
            <div class="product-name-price review-name-price">
                <h2 class="product-type-name review-type-name">{{product.description}}</h2>
                <h1 class="product-name review-name">{{product.name}}</h1>
                <p class="product-price review-price" align="left">${{product.price}}</p>
            </div>
        </div>
        <div class="product-addtocart-btn review-btn">
              <router-link :to="{
                  name: 'Cart',
                  params: {slug: prodID}
              }" class="product-review-link">
              <span class="product-addtoCartd-msg review-msg">Review Cart</span>
              </router-link>
        </div>
    </div>
    <h1 class="categories-msg"> Different taste, same intensity</h1>
   <products :category="category"/>
  </div>
</template>

<script>
import {mapState} from "vuex"
import products from "../components/Products"
export default {
    name: "categories",
    components:{
        products
    },
    props:{
        slug:{
            type: String,
            required: true
        },
        id:{
            type: String,
            required: true
        }
    },
    data(){
        return {
            prodID: this.id,

        }
    },
    computed:{
        ...mapState(['articles']),
        product(){
            return this.articles.find(el => el.prodId === this.prodID);
        },
        category(){
            return this.product.category;
        }
    }
}
</script>

<style>
.categories-liquor{
    margin-left: 530px;
}
.product-review-link{
    text-decoration: none;
}
.reviewcart{
    background-color: whitesmoke;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
    margin-top: 30px;
}
.image.review{
    width: 50px;
    height: 85px;
}
.product-addtocart-btn.review-btn{

    background-color:yellow;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    border: 2px solid purple;
    width: 150px;
    height: 28px;
    color: purple;
    display: flex;
    align-self: center;
    border-radius: 5px;
    cursor: pointer;

}
.product-addtoCartd-msg.review-msg{
    display: flex;
    align-self: center;
    margin-top: 4px;
}
.product-detail.review-detail{
    margin: 0px 50px 0px 0px;
    display: flex;
}
.product-name-price{
    display: flex;
    flex-direction: column;
    align-self: center;
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