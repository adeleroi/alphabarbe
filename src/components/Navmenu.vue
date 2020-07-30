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
              <span class="nav-item-msg" v-if="!getUsername">Sign up</span>
            </router-link>
          </li>
          <li class="nav-item nav-cart">
            <router-link to='/cart' class="nav-cart-link">
              <i class="icon-cart"></i>
            </router-link>
            <span class="nav-class-qty" v-if="getCartCount">{{getCartCount}}</span>
          </li>
      </ul>
      <div class="nav-user-section" v-if="getUsername">
        <i class="icon-avatar"></i>
        <span class="nav-username">{{getUsername}}</span>
        <i class="icon-arrow_drop_down" :class="{active: isActive}" @click="isActive = !isActive"></i>
      </div>
      <div class="nav-login-menu" v-if="isActive">
        <ul class="nav-login-items">
          <li class="nav-login-item">Profile</li>
          <li class="nav-login-item" @click="logOut">Log out</li>
        </ul>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import {mapGetters} from 'vuex'
export default {
    name: "Navmenu",
    data(){
        return{
          isActive: false,
        }
    },
    methods:{
      logOut(){
        firebase.auth().signOut().then(
          res => console.log(res)
        );
        if(this.$router.name !== "Home"){
          this.$router.go()
        }else{
          this.$router.push("/");
        }

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
    display: flex;
    justify-content: space-around;
    background-color: rgb(104, 13, 104);
    font-family: Arial, Helvetica, sans-serif;
    z-index: 2;
    opacity: .95;
}
.nav-items{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    min-width: 900px;
    height: 60px;
    color: white;
    background-color: rgb(104, 13, 104);
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
    color: rgb(104, 13, 104);
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
  background-color: rgb(104, 13, 104);
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
  border: 1px solid rgb(104, 13, 104);
  border-radius: 5px;
  box-shadow: 2px 2px 1px rgb(104, 13, 104);
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
  background-color: #ccc;
  cursor: default;
}
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