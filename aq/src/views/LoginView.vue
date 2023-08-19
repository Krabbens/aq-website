<template>
    <div class="login-section">
      <!-- Solid Color Section with Shadow -->
      <div class="solid-color-section">
        <RotatingText />
      </div>
  
      <!-- Login Section -->
      <div class="login-form-section">
        <div class="login-box">
          <h2>Witaj ponownie,</h2>
          <p>Zaloguj się do systemu</p>
          <form @submit.prevent="handleLogin">
            <div class="input-container">
              <input type="text" v-model="username" class="login-input" id="username" />
              <label for="username">Użytkownik</label>
            </div>
            <div class="input-container">
              <input type="password" v-model="password" class="login-input" id="password" />
              <label for="password">Hasło</label>
            </div>
            <button type="submit" class="cta-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RotatingText from "@/components/RotatingText.vue";
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
        
      handleLogin() {
        var url = 'https://f2iz1i1t1w1m.share.zrok.io/api/v1/login';
        var data = {
          username: this.username,
          password: this.password
        };
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => 
            {
                console.log('Success:', response);
                document.cookie = "token=" + response.token + "; path=/; SameSite=None; Secure";
                // redirect to home
                this.$router.push({ name: 'Home' });
            }
          );
      }
    },
    components: {
      RotatingText
    }
  }
  </script>
  
  <style scoped>
  body, html {
    margin: 0;
    height: 100%;
  }
  
  .login-section {
    display: flex;
    height: 100vh;
  }
  
  .solid-color-section {
    flex: 1;
    background: var(--primary);
    box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);

    color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 50%;
  border-radius: 0 8px 8px 0px;
  }
  
  .login-form-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
  
  .login-box {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-container {
  position: relative;
  margin: 20px 0;
  width: 150%;  /* Increased width for longer fields */
  max-width: 500px;  /* Limiting the maximum width for design consistency */
  border: 1px solid var(--text);
  border-radius: 8px;
  padding: 5px;
  transform: translateX(-17%);  /* Moving the input to the left by 25% */
}

.login-input {
  width: 100%;  
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  transition: box-shadow 0.3s, border-color 0.3s;
  box-sizing: border-box;  /* Adding this to include padding in the width */
}

.login-input:focus {
  outline: none;
  box-shadow: 0px 0px 8px var(--accent);  /* Box-shadow adjusted to appear outside */
  border-color: var(--accent);
}
  
  .login-input + label {
    position: absolute;
    top: -6px;
    left: 10px;
    background: white;
    padding: 0 5px;
    font-size: 0.8em;
    color: var(--text);
    z-index: 10;
  }
  
  .cta-button {
    padding: 10px 30px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 20px;
    align-self: center;
    transform: translateX(-60%);  /* Moving the button to the left by 25% */
  }
  
  .cta-button:hover {
    background: var(--accent);
  }
  
  .cta-button:focus {
    outline: none;
  }
  
  </style>
  