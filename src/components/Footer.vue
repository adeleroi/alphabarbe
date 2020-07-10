<template>
  <div class="footer-container">
      <div class="footer">
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
    name: "Footer"
}
</script>

<style>
.footer-container{
    bottom:0;
    background-color: black;
    width: 100%;
}
.footer{
    background-color: black;
    height: 250px;
    margin-top: 100px;
    margin-left: 20%;
    margin-right: 20%;
}
.media-img{
    width: 20px;
    height: 20px;
}
.social-media{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>