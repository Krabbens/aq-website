<template>
    <div class="login-form">
      <h2>Zaloguj się</h2>
      <input v-model="username" placeholder="Nazwa użytkownika" />
      <input type="password" v-model="password" placeholder="Hasło" />
      <button @click="submitForm">Zaloguj</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      submitForm() {
        // Tutaj możesz dodać logikę logowania
        console.log("Dane logowania:", this.username, this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form {
      width: 300px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
  }
  </style>
  