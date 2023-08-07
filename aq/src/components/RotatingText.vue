<template>
    <div class="rotating-text-container">
      <div v-for="(text, index) in texts" :key="index" class="rotating-text" :class="{ 'active-text': activeIndex === index }">
        {{ text }}
      </div>
      <div class="dots">
        <span v-for="(text, index) in texts" :key="index" class="dot" :class="{ 'active-dot': activeIndex === index }"></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        texts: [
          'Welcome to AQ',
          'Explore our features',
          'Control your smart home'
        ],
        activeIndex: 0,
        timer: null
      };
    },
    mounted() {
      this.startRotatingText();
    },
    methods: {
      startRotatingText() {
        this.timer = setInterval(() => {
          this.activeIndex = (this.activeIndex + 1) % this.texts.length;
        }, 3000); // Switch text every 3 seconds
      },
      stopRotatingText() {
        clearInterval(this.timer);
      }
    },
    beforeDestroy() {
      this.stopRotatingText();
    }
  };
  </script>

  
  <style scoped>
  .rotating-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Center the text vertically */
    position: relative;
    width: 100%;
    color: white; /* Set text color to white */
    height: 100%;
  }
  
  .rotating-text {
    display: none;
    font-size: 3em;
    transition: opacity 0.3s;
  }
  
  .active-text {
    display: block;
    opacity: 1;
  }
  
  .dots {
    display: flex;
    justify-content: center; /* Center the dots horizontally */
    position: absolute;
    bottom: 10px; /* Position the dots at the bottom with a 10px margin */
    right: 0;
    left: 0; /* Center the dots horizontally */
  }
  
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 0 5px;
  }
  
  .active-dot {
    background-color: white; /* Set active dot color to white */
  }
  </style>
  