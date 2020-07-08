<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Products/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Products from "../components/Products.vue"
export default {
  name: "Home",
  components: {
    HelloWorld,
    Products
  }
};
</script>
