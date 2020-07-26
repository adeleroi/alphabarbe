<template>
  <div class="login-container">
      <credentials :login="false"/>
  </div>
</template>

<script>
import credentials from "../components/credentials"
export default {
    name: "Login",
    components:{
        credentials,
    }
}
</script>

<style>

</style>