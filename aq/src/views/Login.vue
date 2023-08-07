<template>
  <div class="container">

    <!-- Hero Section -->
    <div class="hero">
      <div class="content-box">
        <h1>Login</h1>
        <p>Please enter your credentials</p>
        <div class="spacer"></div>  
        <div class="spacer"></div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <input type="text" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <button type="submit" class="cta-button">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Handle the login logic here
    }
  }
}
</script>

<style scoped>
/* Add any specific styles for the login view if necessary */
</style>
