<template>
  <div id="app">
    <div id="nav">
      <Navmenu/>
    </div>
    <router-view />
  </div>
</template>
<script>
import Navmenu from "./components/Navmenu.vue"
export default {
  components:{
    Navmenu,
  }
}
</script>
<style lang="scss">
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body{
  margin:0;
  box-sizing: border-box;
}

</style>
