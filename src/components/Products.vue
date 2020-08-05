<template>
  <div  class="products">
    <ul  class="products-list for-home">
      <li class="products-item"
        v-for="prod in articles"
        v-bind:key="prod.prodId"
        :id="prod.id">
        <router-link :to="{
          name: 'Article',
          params: {slug: prod.name, id:prod.prodId},
          force: true
        }">
        <div class="product-image">
          <img :src="prod.url" class="product-img">
        </div>
          <p class="products-name">{{prod.name}}</p>
        </router-link>
        <p class="products-price">${{prod.price}}</p>
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
    go(){
      if(this.$route.name === 'Article'){
        this.$route.go();
      }
    }
  },
  computed:{
    ...mapGetters(['getAllArticles']),
    articles(){
      if(this.category && this.$route.name == "Categories" || this.$route.name == "Articles"){
        return this.getAllArticles.filter(el => el.category === this.category);
      }else if(this.category && this.$route.name == "Article"){
        return this.getAllArticles.filter(el => el.category !== this.category);
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

  display: grid;

  place-items: center;
  margin: 0px 100px 0px 100px;
}
.products-list{
  list-style: none;
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 0;

}
.product-image{
  margin: 35px;
}
.product-img {
  width: 130px; /*170*/
  height: 270px;/*300*/
  transition: transform .3s;
}
.product-img:hover{
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.2);
}
.products-item{
  margin: 0 21px 0 21px;
}
.products-name{
  color: black;
  font-weight: bold;
}
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
.products{
  min-height: 523px;
}
}
</style>
