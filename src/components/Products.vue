<template>
  <div class="Products">
    <ul class="products-list">
      <li class="products-item"
        v-for="prod in products"
        v-bind:key="prod.prodId"
        :id="prod.id">
        <router-link :to="{
          name: 'Article',
          params: {slug: prod.name+prod.prodId},
          query: {}
        }">
          <p class="products-name">{{prod.name}}</p>
        </router-link>
        <p class="products-price">{{prod.price}}</p>
        <button class="products-addToCart">Add to cart</button>
      </li> 
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Products",
  data(){
    return {
      
    }
  },
  methods:{

  },
  computed:{
    ...mapGetters({
      products: 'getAllArticles',
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
