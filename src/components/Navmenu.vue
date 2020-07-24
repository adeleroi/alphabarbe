<template>
  <div class="navmenu">
      <ul class="nav-items">
          <li class="nav-item nav-logo">
            <router-link to='/' class="nav-logo" title="Go to homepage">Koutoukou
            <span style="color:white;font-family:'Rock Salt', cursive; font-weight:normal;font-size: 24px">Drink</span>
            </router-link>
          </li>
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
    /* background-color: #69977c; */
    background-color: purple;
    /* margin-bottom: 70px; */
    font-family: Arial, Helvetica, sans-serif;

}
.nav-items{
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    min-width: 900px;
    height: 60px;
    color: white;
    /* background-color: white; */
    background-color: purple;
    list-style: none;
    margin:0;
    font-size: 18px;
}
.nav-item{
    align-self: center;
}
.nav-logo{
  font-size: 34px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: yellow;
}
/* .router-link-exact-active{
  color: yellow;

} */
.icon-cart{
    cursor: pointer;
    color: white;
    /* color: black; */
}
/* .nav-cart-link:active{
    color: red;
} */
.nav-class-qty{
    border: 1px solid white;
    padding-top: 4px;
    border-radius: 40%;
    position: absolute;
    top: 27px;
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