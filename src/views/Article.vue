<template>
  <div class="article">
      <!-- <h1 class="article-info">
          {{slug}}
      </h1> 
      v-bind:productId="productName" -->
      <Product/>
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
        
    },
    data(){
        return {
            // productName: this.slug,
        }
    },
    computed:{

    }

}
</script>

<style>

</style>