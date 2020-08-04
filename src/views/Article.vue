<template>
  <div class="article-container">
      <Product class="for-article-prod" v-bind:productId="id"/>
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
            // ID: this.id
        }
    },
    // watch:{
    //     slug:function(){
    //         this.$router.go(0);
    //     }
    // },
    beforeMounted(){
        document.getElementsByClassName("products-list")[0].classList.add("for-article-prod")
    },
}
</script>

<style>
.for-article-prod{
    display: flex;
    justify-content: left;
}

</style>