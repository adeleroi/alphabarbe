<template>
  <div class="navmenu">
      <ul class="nav-items">
          <li class="nav-item nav-logo">logo</li>
          <li class="nav-item">Products</li>
          <li class="nav-item">Advise</li>
          <li class="nav-item">Sign in</li>
          <li class="nav-item nav-cart">
            <router-link to='/cart' class="nav-cart-link">
              <i class="icon-cart"></i>
            </router-link>
            <span class="nav-class-qty" v-if="getCartCount">{{getCartCount}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import Cookies from "js-cookie"
export default {
    name: "Navmenu",
    data(){
        return{
        }
    },
    computed: {
        ...mapGetters(["getCartCount"]),
    },
}
</script>

<style>

.navmenu{
    display: grid;
    justify-content: space-around;
    background-color: rgba(0,0,0,0.8);
    margin-bottom: 70px;
}
.nav-items{
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    min-width: 900px;
    height: 40px;
    color: white;
    background-color: black;
    list-style: none;
    margin:0;
}
.nav-item{
    align-self: center;
}
.icon-cart{
    cursor: pointer;
    color: white;
}
.nav-cart-link:active{
    color: red;
}
.nav-class-qty{
    border: 1px solid white;
    padding-top: 4px;
    border-radius: 40%;
    position: absolute;
    top: 18px;
    height: 11px;
    width: 13px;
    font-size:  10px;
    color: black;
    background-color: white;
    font-family: 'Courier New', Courier, monospace;
}
@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot?l3x7xf');
  src:  url('../assets/fonts/icomoon.eot?l3x7xf#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf?l3x7xf') format('truetype'),
    url('../assets/fonts/icomoon.woff?l3x7xf') format('woff'),
    url('../assets/fonts/icomoon.svg?l3x7xf#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  /* speak: never; */
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-home:before {
  content: "\e900";
}
.icon-cart:before {
  content: "\e93a";
}

</style>