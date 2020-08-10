<template>
    <div class="submit-container">
        <div class="submit-shadow"></div>
        <div class="submit" id="contact">
                <span class="preamble-question mobile">Join our community</span>
                <!-- <span class="preamble-recommendation">Stay in touch with us for releases, demos, and updates.</span> -->
                <div class="submit-invalid-email" v-if="isEmailBad"> Your email doesn't look right...</div>
            <div class="submit-registration">
                <input type="text" id="email" v-model="emailAddress" @focus="focus">
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
            document.getElementsByClassName("submit-shadow")[0].style.opacity = 0.45;
        },
        focus(){
            document.getElementsByClassName("submit-shadow")[0].style.opacity = 0.85;
            console.log(document.getElementsByClassName("submit-shadow"))
        }
    }
}

</script>
<style>
.submit-container{
    position: relative;
    display: flex;
    /* place-items: center; */
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
    /* background: #69977C; */
    background-image: url("../assets/photo-1594401333633-598ef7c1e801.jpeg");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: cover;
    width: 86%;
    margin-bottom: 60px;
}
.submit-invalid-email{
    display: flex;
    z-index: 2;
    color: red;
    align-self: left;
    width: 520px;
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
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 0px;
    border-radius: 40px;
    width: 50%;
    position: relative;
}
#btn-submit {
    width: 112px;
    cursor: pointer;
    background: #24292e/*rgb(104, 13, 104)*/;
    border: 1px solid #24292e/*rgb(104, 13, 104)*/;
    border-radius: 40px;
    position: absolute;
    right: 0;
    outline: none;
}
#btn-submit:hover{
    /* color: black; */
    background-color: rgb(68, 68, 241);
    border: none;
}
#email {
    padding-left: 20px;
    width: 80%;
    font-size: 20px;
    line-height: 28px;
    background-color: rgba(255,255,255,.15);
    border: 1px solid #fff;
    border-radius: 33px;
    margin-left: 0px;
    outline: none;
    /* opacity: 0.98; */
}

#email {
    height: 49px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#btn-submit {
    height: 47px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 1px;
    margin-top: 1px;
}
.submit-text {
    /* font-family: Rokkitt; */
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #fff;
}
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 614px)

and (-webkit-min-device-pixel-ratio: 2) {
.preamble-question.mobile{
    font-size: 16px
}
.submit-shadow{
    height: 80%;
    width: 100%;
}
.submit-container{
    width: 100%;
}
.submit{
    width: 100%;
    height: 220px;
    background-image: url("../assets/photo-1594401333633-598ef7c1e801.jpeg");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: cover;
}
.submit-registration{
    width: 90%;
}
#btn-submit {
    height: 40px;
    width: 68px;
}
#email{
    height: 42px;
    font-size: 14px;;
}

}
</style>