<template>
    <div class="submit-container">
        <div class="submit-shadow"></div>
        <div class="submit" id="contact">
                <span class="preamble-question">Join our community</span>
                <!-- <span class="preamble-recommendation">Stay in touch with us for releases, demos, and updates.</span> -->
                <div class="invalid-email" v-if="isEmailBad"> Your email doesn't look right...</div>
            <div class="submit-registration">
                <input type="text" id="email" v-model="emailAddress">
                <button id="btn-submit" @click="sendEmail" ><span class="submit-text">submit</span></button>
            </div>

        </div>
    </div>
</template>
<script>
import * as api from "../Api/api"
export default {
    name: "submit",
    data(){
        return {
            emailAddress: "",
            isEmailBad: false,
        }
    },

    methods: {
        validate() {
            /* eslint-disable no-useless-escape */
            const regEx =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
            this.isEmailBad = !regEx.test(this.emailAddress)
            return !this.isEmailBad
        },
        async sendEmail() {
            
            if(this.validate()) {
                console.log(typeof(this.emailAddress))
                api.subscribe(this.emailAddress).
                then((x) => {
                    console.log(x)
                })
                this.emailAddress = "";
             }    
        }
    }
}

</script>
<style>
.submit-container{
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 100px;
    /* z-index: 1000; */
}
.submit-shadow{
    position: absolute;
    width: 86%;
    height: 85%;
    z-index: 1;
    opacity: 0.45;
    background-color: black;
}
  .submit {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    left: 0%;
    height: 336px;
    background: #69977C;
    background-image: url("../assets/photo-1594401333633-598ef7c1e801.jpeg");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: cover;
    width: 86%;
    margin-bottom: 60px;
  }
.preamble-question {
    height: 54px;
    font-family: Poppins;
    font-size: 36px;
    line-height: 54px;
}
.preamble-question, .preamble-recommendation {
    width: 642px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    z-index: 2;
    color: #fff;
}
.preamble-recommendation {
    height: 36px;
    font-family: Ilisarniq;
    font-size: 15px;
    line-height: 18px;
}
.submit-registration{
    z-index: 2;
}
#btn-submit {
    width: 186px;
    cursor: pointer;
    background: #4b4a80;
    border: 1px solid #fff;
    border-radius: 5px;
}
#email {
    padding-left: 10px;
    width: 416px;
    font-size: 25px;
    line-height: 28px;
    background: hsla(0,0%,100%,.7);
    border: 1px solid #4b4a80;
    border-radius: 5px;
}
#btn-submit, #email {
    height: 56px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.submit-text {
    font-family: Rokkitt;
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 28px;
    text-align: center;
    color: #fff;
}
</style>