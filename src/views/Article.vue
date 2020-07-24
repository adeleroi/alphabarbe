<template>
  <div class="article-container">
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