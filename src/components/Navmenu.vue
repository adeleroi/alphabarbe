<template>
  <div class="navmenu">
      <div @click="showMenu = !showMenu" v-bind:class="{active:showMenu}" class="hamburger">
        <div class="hamburgerline" ref="openMenu"></div>
      </div>
      <!-- <div class="nav-mobile nav-logo" >
        <router-link to='/' class="nav-logo" title="Go to homepage">Koutoukou
        <span style="color:white;font-family:'Rock Salt', cursive; font-weight:normal;font-size: 24px">Drink</span>
        </router-link>
      </div> -->
      <div class="nav-items" :class="{navmobile: showMenu}" >
          <div class="nav-item nav-logo" v-if="!showMenu">
            <router-link to='/' class="nav-logo" title="Go to homepage">Koutoukou
            <span class="nav-logo-drink">Drink</span>
            </router-link>
          </div>
          <div class="nav-item" :class="{mobile: showMenu}">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'vodka'}
            }">
              <span class="nav-item-msg">Vodka</span>
            </router-link>
          </div>
          <div class="nav-item" :class="{mobile: showMenu}">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'whiskey'}
            }">
              <span class="nav-item-msg">Whiskey</span>
            </router-link>
          </div>
          <div class="nav-item" :class="{mobile: showMenu}">
            <router-link :to="{
              name: 'Articles',
              params:{slug: 'gin'}
            }">
              <span class="nav-item-msg">Gin</span>
            </router-link>
          </div>
          <div class="nav-item" :class="{mobile: showMenu}">
            <router-link :to="{
              name: 'Signup',
            }">
              <span class="nav-item-msg" v-if="!getUsername">Sign up</span>
            </router-link>
          </div>
          <div class="nav-item nav-cart" :class="{mobile: showMenu}">
            <router-link to='/cart' class="nav-cart-link">
              <i class="icon-cart"></i>
            </router-link>
            <span class="nav-class-qty" v-if="getCartCount">{{getCartCount}}</span>
          </div>
      </div>
      <div class="nav-user-section" v-if="getUsername">
        <i class="icon-avatar"></i>
        <span class="nav-username">{{getUsername}}</span>
        <i class="icon-arrow_drop_down" :class="{active: isActive}" @click="isActive = !isActive"></i>
      </div>
      <div class="nav-login-menu" v-if="isActive">
        <ul class="nav-login-items">
          <div class="nav-login-item">Profile</div>
          <div class="nav-login-item" @click="logOut">Log out</div>
        </ul>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import {mapGetters, mapMutations} from 'vuex'
import Cookies from "js-cookie"

export default {
    name: "Navmenu",
    data(){
        return{
          isActive: false,
          showMenu: false,
        }
    },
    methods:{
      ...mapMutations(['clearCart']),
      logOut(){
        firebase.auth().signOut().then(
          res => console.log(res)
        );
        this.clearCart;
        Cookies.remove('userId');
        this.$router.push('/login', ()=> this.$router.go(0));
      }
    },
    computed: {
        ...mapGetters(["getCartCount", "getUsername"])
    },
}
</script>

<style>
.navmenu{
    position: fixed;
    width: 100%;
    top: 0;
    display: grid;
    /* justify-content: space-around; */
    place-items: center;
    background-color:#24292e; /*rgb(104, 13, 104);*/
    font-family: Arial, Helvetica, sans-serif;
    z-index: 2;
    opacity: .95;
}
.nav-items{
    display: flex;
    /* grid-template-columns: auto auto auto auto auto; */
    /* flex-direction: row; */
    place-items: center;
    /* justify-content: center; */
    /* min-width: 900px; */
    height: 60px;
    color: white;
    background-color: #24292e;/* rgb(104, 13, 104);*/
    list-style: none;
    margin:0;
    font-size: 18px;
    padding-left: 0;

}
.nav-item{
    align-self: center;
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
}
.nav-item-msg{
  color:white;
  opacity: 0.8;
}
.nav-item-msg:hover{
  opacity: 1;
  color: yellow;
}

.nav-logo{
  font-size: 34px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
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
    color: #24292e /* rgb(104, 13, 104)*/;
    background-color: white;
    font-family: 'Courier New', Courier, monospace;
}
.nav-user-section{
  position: absolute;
  display: flex;
  right: 20px;
  /* justify-content: left; */
  padding-left: 15px;
  top: 80px;
  background-color: #24292e/*rgb(104, 13, 104)*/;
  height: 40px;
  width: 150px;
  border-radius: 35px;
}
.nav-username{
  color: white;
  display: flex;
  align-self: center;
  margin-left: 10px;
}
.icon-avatar{
  display: flex;
  align-self: center;
  color: white;
  padding-left: 6px;
  padding-top: 4px;
  font-size: 22px;
  border: 2px solid white;
  border-radius: 50%;
  width: 31px;
  height: 33px;
}
.icon-arrow_drop_down{
  display: flex;
  align-self: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.icon-arrow_drop_down.active{
  transform: rotate(180deg);
}
.nav-login-menu{
  position: absolute;
  top: 130px;
  right: 20px;
  border: 1px solid #24292e/*rgb(104, 13, 104)*/;
  border-radius: 5px;
  /* padding: 10px; */
  box-shadow: 2px 2px 10px #24292e/*rgb(104, 13, 104)*/;
}
.nav-login-items{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  width: 110px;
  line-height: 42px;
  align-self: center;
  list-style: none;
  /* margin: 0; */
}
.nav-login-item:hover{
  background-color: #24292e/*rgb(104, 13, 104)*/;
  cursor: default;
  color: white;
  cursor: pointer;
}
.nav-logo-drink{
  color:white;font-family:'Rock Salt', cursive; font-weight:normal;font-size: 24px
}
.nav-mobile{
  visibility: hidden;
}
/****************************************************************************** */
  @media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 614px)

  and (-webkit-min-device-pixel-ratio: 2) {
  .hamburger {
    position: relative;
    left: 0;
    /* margin-top: 18px; */
    display: block;
    justify-content: center;
    /* margin-right: 18.45px; */
    width: 48px;
    height: 48px;
    transition: all .5s ease-in-out;
    /* background: url(./pictures/hamburger.png); */
    z-index: 4;
  }
  .hamburgerline {
    position: absolute;
    top: 50%;
    width: 25px;
    height: 3px;
    background-color: white; /*#4B4A80*/
    /* border: solid 1px; */
    transition: all .5s ease-in-out;
    transform: translateY(-50%);
  }
  .hamburgerline::before,
  .hamburgerline::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    left: 0;
    background-color: white;
    transition: all .3s ease-in-out;
  }
  .hamburgerline::before {
    transform: translateY(-10px)
  }
  .hamburgerline::after {
    transform: translateY(10px)
  }
  .hamburger.active {
  }
  .hamburger.active  .hamburgerline {
    background: transparent;
    /* background-color: blue; */
  }
  .hamburger.active .hamburgerline::before {
    transform: rotate(45deg);
    background-color: white;
  }
  .hamburger.active .hamburgerline::after {
    transform: rotate(-45deg);
    background-color: white;
  }
  .nav-items.navmobile{
    position: absolute;
    left: 0;
    top:48px;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    transition: all 0.8s cubic-bezier(1, 0, 0, 0);
    background-color: black;
    height: 800px;
    width: 100%;
  }
  .nav-item{
    /* position: absolute; */
    display: flex;
    justify-content: left;
  }
  .nav-items.navmobile > nav-item.icon{
    display: none;
  }
  .nav-item.mobile{
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    justify-content:left;
    margin-left: 70px;
  }
  .nav-item-msg{
    
  }
  .nav-items{
    display: none;
  }
  .navmenu{
    position:  relative;
    display: flex;
    justify-content: left;
    padding-left: 20px;
    background: #24292e;/*linear-gradient(to right ,orange,purple, yellow);*/
    height: 100%;
    width: 100%;
  }
  .nav-logo{
   visibility: visible;
   color: red;
    font-size: 10px;
  }
}
/******************************************************************************* */
@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot?jcfre3');
  src:  url('../assets/fonts/icomoon.eot?jcfre3#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf?jcfre3') format('truetype'),
    url('../assets/fonts/icomoon.woff?jcfre3') format('woff'),
    url('../assets/fonts/icomoon.svg?jcfre3#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-arrow_drop_down:before {
  content: "\e902";
}
.icon-user1:before {
  content: "\e900";
}
.icon-profile:before {
  content: "\e900";
}
.icon-avatar:before {
  content: "\e900";
}
.icon-home:before {
  content: "\e901";
}
.icon-cart:before {
  content: "\e93a";
}

</style>