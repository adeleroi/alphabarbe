<template>
  <div class="signup">
      <div class="signup-header">
            <router-link :to="{name: 'Home'}" class="signup__header-logo">
                <h1 class="signup-logo">Koutoukou</h1>
                <span class="signup-logo second">Drink</span>
            </router-link>
        <h2 class="signup-msg">Sing up</h2>
      </div>
      <div class="signup-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/cryptowebsite-798af.appspot.com/o/vodka%2Fproduct-foragers-keep.png?alt=media&token=cf48716d-f3f5-47ee-8ac6-8cb6011a6bda" alt="" class="signup-img">
        <form action="" class="signup-form-data">
            <label for="" class="signup-title name">what's your name?</label>
            <input type="text" placeholder="Name" v-model.lazy="Name" class="signup-username signform">
            <label for="" class="signup-title name">what's your email?</label>
            <input type="text" placeholder="email" v-model.lazy="email" class="signup-username signform">
            <label for="" class="signup-title name">Create a password</label>
            <input type="password" placeholder="Password" class="signup-password signform">
            <label for="" class="signup-title name">Confirm your password</label>
            <input type="password" placeholder="Confirm password" class="signup-password signform">
            <button class="signup-submit-btn " @submit.prevent="login" type="submit">
                <span class="signup-submit-btn-msg">SUBMIT</span>
            </button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    name: "Signup",
    data(){
        return {
            email: '',
            Password: ''
        }
    },
    methods:{
        login(){

        }
    }
}
</script>

<style>
.signup{
    position: absolute;
    top:0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
    /* background: linear-gradient(to bottom right,  #333028, purple); */
    z-index: 20;
}
.signup__header-logo{
    display: flex;
    align-self: center;
}
.signup-header{
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 40px 0 30px 0;
}
.signup-logo{
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: purple;
}
.second{
    padding-left: 10px;
    font-family: "Rock Salt", cursive;
    
}

.signup-img{
    height: 500px;
    transform: rotate(5deg);
}
.signup-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
}
.signup-form-data{
    display: flex;
    flex-direction: column;
    align-self: center;
}
.signform{
    margin-bottom: 10px;
    height: 40px;
    width: 350px;
    font-size: 16px;
    padding-left: 10px;
    border: 1px solid black;
    margin-top: 10px;

}
.signup-username{
}
.signup-password{

}
.signup-title{
    display: flex;
    align-self: left;
}
.signup-submit-btn{
  border: 0.5px solid #0077ed;
  width: 350px;
  height: 50px;
  color: white;
  font-size: 16px;    
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(to right,#fdde5c,#f8ab5e,#f56a62,#a176c8,#759beb,#65beb3,#70db96);
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 50px;
  margin-top: 10px;
  display: flex;
}
.signup-submit-btn-msg{
  background: white;
  border-radius: 25px;
  padding: 12px 140px 12px 140px;
  color: black;
}
</style>