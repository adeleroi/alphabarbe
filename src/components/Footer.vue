<template>
  <div class="footer-container">
      <div class="footer">
          <ul class="social-media">
              <li>
                  <a href="https://www.instagram.com" class="media" target ="_blank" rel="noopener noreferrer">
                    <img src="../assets/social/instagram.3ab7002e.svg" alt="" class="media-img">
                  </a>
              </li>
              <li>
                <a href="https://www.facebook.com" class="media" target ="_blank" rel="noopener noreferrer">
                    <img src="../assets/social/facebook.abda975d.svg" alt="" class="media-img">
                </a>
              </li>
              <li>
                <a href="https://twitter.com" class="media" target ="_blank" rel="noopener noreferrer">
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
    /* position: absolute; */
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