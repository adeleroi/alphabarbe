<template>
  <div class="navmenu">
      <ul class="nav-items">
          <li class="nav-item nav-logo">
            <router-link to='/' class="nav-logo" title="Go to homepage">Koutoukou
            <span style="color:white;font-family:'Rock Salt', cursive; font-weight:normal;font-size: 24px">Drink</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'vodka'}
            }">
              <span class="nav-item-msg">Vodka</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'whiskey'}
            }">
              <span class="nav-item-msg">Whiskey</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'gin'}
            }">
              <span class="nav-item-msg">Gin</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{
              name: 'Signup',
            }">
              <span class="nav-item-msg">Sign up</span>
            </router-link>
          </li>
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
    position: fixed;
    width: 100%;
    top: 0;
    display: grid;
    justify-content: space-around;
    background-color: purple;
    font-family: Arial, Helvetica, sans-serif;
    z-index: 2;
    opacity: .9;
    /* margin-bottom: 100px; */
}
.nav-items{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-width: 900px;
    height: 60px;
    color: white;
    background-color: purple;
    list-style: none;
    margin:0;
    font-size: 18px;
}
.nav-item{
    align-self: center;
    cursor: pointer;
}
.nav-item-msg{
  color:white;
  opacity: 0.8;
}
.nav-item-msg:hover{
  opacity: 1;
}

.nav-logo{
  font-size: 34px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: yellow;
}

.icon-cart{
    cursor: pointer;
    color: white;
}
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