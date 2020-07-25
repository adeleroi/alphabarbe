<template>
  <div class="errorpage">
    <h1 class="error-msg">It appears your web browser is drunk. Let's take it 
      <router-link to="/" class="error-home">home.</router-link>
      </h1>
    <p class="error-explaination">
        The URL may be misspelled or the page you're looking for is no longer available.
    </p>
  </div>
</template>

<script>
export default {
    name: "Errorpage"
}
</script>

<style scoped>
.errorpage{
  min-height: 340px;
}
.error-msg{
  margin-top: 15%;
  font-size: 40px;
}
.error-explaination{
  font-size: 20px;
  font-family: Robolo;
}
.error-home{
  color: purple;
  text-decoration: underline;
}
</style>