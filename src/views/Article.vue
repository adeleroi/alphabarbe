<template>
  <div class="article">
      <!-- <h1 class="article-info">
          {{ID}}
      </h1> 
      <p> {{slug}}</p> -->
      <Product v-bind:productId="ID"/>
  </div>
</template>

<script>
import Product from "../components/Product.vue"
export default {
    name: "Article",
    components: {
        Product,
    },
    props: {
        slug: {
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
            
            ID: this.id
        }
    },
    computed:{

    }

}
</script>

<style>

</style>