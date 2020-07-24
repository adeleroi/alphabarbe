<template>
  <div class="footer-container">
      <div class="footer">
          <!-- <div class="footer-image">
              <img src="../assets/social/80311082_501825293803540_6568125080105123840_n.jpg" alt="" class="footer-img">
          </div> -->
          <ul class="social-media">
              <li>
                  <a href="https://www.instagram.com/alpha_barbe/" class="media" target ="_blank" rel="noopener noreferrer">
                    <img src="../assets/social/instagram.3ab7002e.svg" alt="" class="media-img">
                  </a>
              </li>
              <li>
                <a href="" class="media" target ="_blank" rel="noopener noreferrer">
                    <img src="../assets/social/facebook.abda975d.svg" alt="" class="media-img">
                </a>
              </li>
              <li>
                <a href="" class="media" target ="_blank" rel="noopener noreferrer">
                    <img src="../assets/social/twitter.dfc3ada2.svg" alt="" class="media-img">
                </a>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name: "Footer",
    data(){
        return{
        }
    }
}
</script>

<style>
.footer-container{
    bottom:0;
    background-color: #69977c;
    width: 100%;
}
.footer{
    background-color: #69977c;
    height: 250px;
    margin-top: 100px;
    margin-left: 20%;
    margin-right: 20%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.media-img{
    width: 20px;
    height: 20px;
}
.footer-image{
    display: flex;
    align-self: center;
}
.social-media{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;
    align-self: center;
    padding:0;
}
</style>