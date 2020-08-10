<template>
  <div class="signup">
      <div class="signup-header">
            <router-link :to="{name: 'Home'}" class="signup__header-logo">
                <h1 class="signup-logo">Koutoukou</h1>
                <span class="signup-logo second">Drink</span>
            </router-link>
        <h2 class="signup-msg" v-if="login">Sign up</h2>
        <h2 class="signup-msg" v-else>Log in</h2>
      </div>
      <div class="signup-container">
        <img src="../assets/product-foragers-keep.png" alt="" class="signup-img mobile">
        <form action="" class="signup-form-data" @submit.prevent="connect">
            <label for="" class="signup-title" v-if="login">What's your name?</label>
            <input type="text" placeholder="Enter you name" v-model.lazy="name" class="signup-username signform" @blur="nameCheck" v-if="login">
            <label for="" class="signup-title error" v-if="showNameError">Your name is invalid.</label>
            <label for="" class="signup-title">What's your email?</label>
            <input type="text" placeholder="Enter you email" v-model.lazy="email" class="signup-username signform" @blur="emailCheck" @focus="hideError">
            <label for="" class="signup-title" v-if="login">What's should we call you?</label>
            <input type="text" placeholder="Enter a username" v-model.lazy="username" class="signup-username signform" @blur="emailCheck" @focus="hideError" v-if="login">
            <label for="" class="signup-title error" v-if="showSignupError">This email is already in use.</label>
            <label for="" class="signup-title error" v-if="showEmailError">Your email is invalid.</label>
            <label for="" class="signup-title" v-if="login">Create a password</label>
            <label for="" class="signup-title" v-if="!login">Password</label>
            <input type="password" placeholder="Enter a password" v-model.lazy="password" class="signup-password signform" @focus="hideError">
            <label for="" class="signup-title error" v-if="showWeakPassMsg">Password should be at least 6 characters</label>
            <label for="" class="signup-title" v-if="login">Confirm your password</label>
            <input type="password" placeholder="Confirm password" v-model.lazy="confirmPass" class="signup-password signform" @blur="passwordCheck" @focus="hideError" v-if="login">
            <label for="" class="signup-title error" v-if="showPasswordError">The passwords don't match.</label>
            <label for="" class="signup-title error" v-if="showUserNotFoundMsg">Incorrect email or password.</label>
            <label for="" class="signup-title error" v-if="showNetworkErrorMsg">Network error. Interrupted connection.</label>
            <button class="signup-submit-btn ">
                <span class="signup-submit-btn-msg">SUBMIT</span>
            </button>
        </form>
      </div>
      <div class="signup-account" v-if="login">
          <span>
            Have an acccount?
            <router-link :to="{name: 'Login'}">
            <span class="signup-login-link">Log in</span>
            </router-link>.
          </span>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth" 
import "firebase/firestore"
import Cookies from "js-cookie"
import {mapState, mapGetters, mapActions} from "vuex"
export default {
    name: "Signup",
    props: {
        login: Boolean
    },
    data(){
        return {
            name: '',
            email: '',
            password: '',
            username: '',
            confirmPass: '',
            showNameError: false,
            showEmailError: false,
            showWeakPassMsg: false,
            showSignupError: false,
            showPasswordError: false,
            showUserNotFoundMsg: false,
            showNetworkErrorMsg: false,
            baseUrl: 'http://localhost:4000/setcustomclaims'
        }
    },
    methods:{
        ...mapActions(
            {
                retrieveUserInfo: "retrieveUserInfo",
                retrieveTempCart: "retrieveTempCart",
                retrieveCart: "retrieveCart"
            }
        ),
        isNameValid(value){
            /*eslint-disable no-useless-escape*/
            const regex = /^[a-zA-Z\-' ]+$/;
            console.log(regex.test(value));
            return regex.test(value);
        },
        isEmailValid(value){
            /*eslint-disable no-useless-escape*/
            const regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
            return regex.test(value)
        },// ID: this.id
        isPasswordValid(){
            return this.password === this.confirmPass;
        },
        nameCheck(){
            if(!this.isNameValid(this.name)){
                this.showNameError = true;
            }else{
                this.showNameError = false;
            }
        },
        emailCheck(){
            if(!this.isEmailValid(this.email)){
                this.showEmailError = true;
            }else{
                this.showEmailError = false;
            }
        },
        passwordCheck(){
            if(!this.isPasswordValid()){
                this.showPasswordError = true;
            }else{
                this.showPasswordError = false;
            }
        },
        hideError(){
            this.showPasswordError, this.showWeakPassMsg, this.showSignupError = false;
        },
        signUp(){
            if(!this.showNameError && !this.showEmailError && !this.showPasswordError){
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    if(cred.user.uid)
                        Cookies.set('userId', cred.user.uid, {expires: 365});
                    return cred.user.updateProfile({
                        displayName: this.username,
                        emailVerified: true
                    })
                }).then(() => {
                    this.$router.push("/login");
                })
                .catch(e => {
                    if(e.code === "auth/email-already-in-use"){
                        this.showSignupError = true;
                    }
                    if(e.code === "auth/weak-password"){
                        this.showWeakPassMsg = true;
                    }
                })
            }
        },
        logIn(){
            if(!this.showEmailError){
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    Cookies.set('userId', cred.user.uid, {expires: 365})
                    this.retrieveTempCart();
                    this.retrieveUserInfo();
                    // this.retrieveCart();
                    return cred.user.getIdToken();
                })
                .then(idToken => {
                    fetch(this.baseUrl, {
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            idToken,
                        })
                    })
                    .then(res => {
                        return res.json()})
                    .then(data => {
                        if(data.status == "success"){
                            firebase.auth().currentUser.getIdToken(true);
                            if(this.tempCart.length){
                                this.$router.push("/ask");
                            }else{
                                this.$router.push("/");
                            }
                        }
                    })
                })
                .catch(e =>{
                    if(e.code === "auth/user-not-found"){
                        this.showUserNotFoundMsg = true;
                    }else if(e.code === "auth/network-request-failed"){
                        this.showNetworkErrorMsg = true;
                    }
                })
            }
        },
        connect(){
            if(!this.login){
                return this.logIn();
            }else{
                return this.signUp();
            }
        }
    },
    computed:{
        ...mapState({
            cart:'cart',
            tempCart: 'tempCart'
            }),
        ...mapGetters({
            getCartCount:'getCartCount'})
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
    height: 400px;
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
  align-self: center;
}
.signup-submit-btn-msg{
  background: white;
  border-radius: 25px;
  padding: 12px 140px 12px 140px;
  color: black;
}
.error{
    color: red;
    margin-bottom: 20px;
}
.signup-login-link{
    text-decoration: underline purple;
}
.signup-account{
    margin-bottom: 30px;
}
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
.signup-img.mobile{
    display: none;
}
.signup-form-data{
    /* padding-left: 10%; */
    display: grid;
    place-items: center;
}
.signform{
    width: 85%;
}
}
</style>