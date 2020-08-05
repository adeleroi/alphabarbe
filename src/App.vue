<template>
  <div id="app">
      <Navmenu/>
    <router-view />
    <Footer/>
  </div>
</template>
<script>
import Navmenu from "./components/Navmenu.vue"
import Footer from "./components/Footer.vue"
export default {
  components:{
    Navmenu,
    Footer
  }
}
</script>
<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Ubuntu,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}


html,body{
  margin:0;
  box-sizing: border-box;
  overflow-x: hidden;
}

</style>
