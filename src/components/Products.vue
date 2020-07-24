<template>
  <div class="products">
    <ul class="products-list">
      <li class="products-item"
        v-for="prod in articles"
        v-bind:key="prod.prodId"
        :id="prod.id">
        <router-link :to="{
          name: 'Article',
          params: {slug: prod.name, id:prod.prodId},
          query: {}
        }">
        <div class="product-image">
          <img :src="prod.url" class="product-img">
        </div>
          <p class="products-name">{{prod.name}}</p>
        </router-link>
        <p class="products-price">${{prod.price}}</p>
        <!-- <button class="products-addToCart">Add to cart</button> -->
      </li> 
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Products",
  props:{
    category:String,
  },
  data(){
    return {
      
    }
  },
  methods:{

  },
  computed:{
    ...mapGetters(['getAllArticles']),
    articles(){
      if(this.category){
        return this.getAllArticles.filter(el => el.category === this.category);
      }
      return this.getAllArticles;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
a{
  text-decoration: none;
}
.products{
  min-height: 523px;
  margin-left: 150px;
  margin-right: 150px;
}
.products-list{
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  justify-content: center;

}
.product-image{
  margin: 35px;
}
.product-img {
  width: 170px;
  height: 300px;
  transition: transform .3s;
}
.product-img:hover{
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.2);
}
</style>
