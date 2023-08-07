<template>
    <div>
      <p>App Version: 1.0.0</p>
      <label>
        Dark Mode
        <input type="checkbox" v-model="darkMode" />
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        darkMode: false
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for the settings view here */
  </style>
  