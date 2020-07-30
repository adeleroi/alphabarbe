<template>
  <div class="articles-container">
    <h1 class="articles-type">{{slug}}</h1>
    <Products :category="slug"/>
  </div>
</template>

<script>
import Products from "../components/Products"
export default {
    name: "Articles",
    components:{
        Products,
    },
    props:{
        slug:{
            type: String,
            required: true
        }
    },
    mounted(){
        document.getElementsByClassName("products-list")[0].classList.add("for-categories")
    }
}
</script>

<style>
.articles-type{
    margin-top: 100px;
}
.products-list.for-categories{
    display: flex;
    justify-content: center;
}
</style>