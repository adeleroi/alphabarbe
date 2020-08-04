<template>
  <div class="home-container">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <h1 class="home-title">
    Our products will
  </h1>
    <Products/>
    <submit/>
  </div>
</template>

<script>
// @ is an alias to /src
import submit from "@/components/Submit.vue";
import Products from "../components/Products.vue"
export default {
  name: "Home",
  components: {
    submit,
    Products
  }
};
</script>
<style>
.home-container{
  margin-top: 100px;
}
.home-title{
  margin-bottom: 50px;
}
</style>