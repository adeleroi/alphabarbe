<template>
    <div class="review">
      <div class="review-title-stars">
          <h2 class="review-title">ratings</h2>
          <div class="stars"></div>
      </div>
      <div class="review-btn-comments">
            <span class="review-btn-msg" v-if="showReviewBtn" @click="displayComment = !displayComment">{{reviewMsg}}</span>
        <div action="" class="review-submit-review" v-if="displayComment" >
            <div class="review-container">
                <span class="review-container-msg" role="textbox" contenteditable="true">
                </span>
                <i class="icon-send" @submit.prevent="postComment"></i>
            </div>
        </div>
        <div class="review-comments">
            <div class="reviews-items" v-for="review in reviews" :key="review.displayName">
                <div class="reviews-item">
                    <i class="reviews-user-icon icon-arrow_drop_down"></i>
                    <span class="reviews-user-name">{{review.displayName}}</span>
                </div>
                <div class="reviews-stars">{{review.starts}} star(s)</div>
                <div class="reviews-date">{{review.date}}</div>
                <div class="reviews-comment">
                    <p class="comment">{{review.comment}}</p>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    name: "Review",
    props:{
        prodId: String
    },
    data(){
        return {
            showReviewBtn: false,
            displayComment: false,
            comment: String,
        }
    },
    methods:{
        postComment(){

        },

    },
    computed:{
        reviewMsg(){
            if(!this.displayComment)
                return "Add review +";
            return "Hide review"
        }
    },
    created(){
    firebase.auth().currentUser.getIdTokenResult(true)
      .then(idTokenResult => {
          console.log('idTokenResult: ',idTokenResult.claims)
        if(idTokenResult.claims.registered){
            this.showReviewBtn = true;
        }
      })
      .catch(e => {
          console.log(e);
      })
    }

}
</script>

<style >
.review{
    display: flex;
    flex-direction: row;
}
.review-title-stars{
    display: flex;
    flex-direction: column;
    width: 400px;
}
.review-title{
    text-align: left;
    padding-left: 20px;
    margin-top: 0;
}
.review-btn-comments{
    display: flex;
    flex-direction: column;
}
.reviews-items{
    display: flex;
    flex-direction: column;
}
.reviews-item{
    display: flex;
    flex-direction: row;
}
.comment{
    max-width: 600px;
}
/********************** */

.review-container{
  border: 1px solid  rgb(88, 86, 86);
  border-radius: 25px;
  width: 650px;
  display: flex;
  /* background-color: rgb(230, 220, 220); */
  
}
.review-container-msg{

  font-family: inherit;
  font-size: inherit;
  padding: 10px 10px 10px 20px;
  box-sizing: border-box;
  min-width: 600px;
  max-width: 600px;
  outline: none;
  text-align: left;
  cursor: text;
}
.review-container-msg {
  display: block;
  width: 100%;
  overflow: hidden;
  /* resize: right: ; */
  min-height: 40px;
  line-height: 20px;
  
}
.review-container-msg[contenteditable]:empty::before {
  content: "Your comment...";
  color: rgb(58, 55, 55);
}
.review-btn-msg{
    width: 95px;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
    color: purple;
    /* line-height: 10px; */
    margin-bottom: 20px;
}
.icon-send{
    display: flex;
    align-self:flex-end;
    padding-bottom: 10px;
    /* color: blue; */
    cursor: pointer;
}
@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot?jvjlod');
  src:  url('../assets/fonts/icomoon.eot?jvjlod#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf?jvjlod') format('truetype'),
    url('../assets/fonts/icomoon.woff?jvjlod') format('woff'),
    url('../assets/fonts/icomoon.svg?jvjlod#icomoon') format('svg');
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

.icon-paper-plane:before {
  content: "\e901";
}
.icon-travel:before {
  content: "\e901";
}
.icon-plane:before {
  content: "\e901";
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
.icon-arrow_drop_down:before {
  content: "\e902";
}
.icon-send:before {
  content: "\e903";
}
.icon-cart:before {
  content: "\e93a";
}

</style>