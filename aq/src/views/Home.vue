<template>
  <div class="container">
    <!-- Navbar -->
    <div class="navbar">
      <div class="logo">aq</div>
      <div class="nav-icons">
        <router-link to="/">
          <FeatherIcon icon="home" />
        </router-link>
        <router-link to="/settings">
          <FeatherIcon icon="settings" />
        </router-link>
        <!-- Your dark mode toggle remains the same -->
        <div @click="toggleDarkMode">
          <FeatherIcon :icon="darkMode ? 'sun' : 'moon'" />
        </div>
      </div>
    </div>




    <div v-if="isLoading" class="loading-screen">
      <div class="circle"></div>
    </div>

    <div v-if="isValidToken">
      <div class="camera-box container">
        <div></div> <!-- For the vertical notches of Top Left & Bottom Right -->
        <span>
          <div></div> <!-- For the vertical notches of Top Right & Bottom Left -->
        </span>
        <Device v-for="device in devices" :key="device.id" :device="device" @toggle-device="handleDeviceToggle" />
        <button class="add-device">+</button>
      </div>
    </div>
    <div v-else>
      <!-- Hero Section -->
      <div class="hero">
        <div class="content-box">
          <h1>AQ</h1>
          <p>Kontrola urządzeń domowych</p>
          <div class="spacer"></div> <!-- Spacer to push button down -->
          <div class="spacer"></div>
          <router-link to="/login" class="cta-button">Zaloguj się</router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features">
        <div class="feature-item">
          <i class="icon-feature1"></i>
          <h2>Prostota</h2>
          <p>Intuicyjne zarządzanie urządzeniami.</p>
        </div>
        <div class="feature-item">
          <i class="icon-feature2"></i>
          <h2>Wszechstronność</h2>
          <p>Kontrola oświetlenia, ogrzewania i więcej.</p>
        </div>
        <div class="feature-item">
          <i class="icon-feature3"></i>
          <h2>Funkcjonalność</h2>
          <p>Bogata paleta możliwości.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatherIcon from '@/components/FeatherIcon.vue';
import Device from '@/components/Device.vue';
import axios from 'axios';

export default {
  name: 'LandingPage',
  data() {
    return {
      isValidToken: false,
      isLoading: true,
      devices: [],
      darkMode: false,
    };
  },
  components: {
    Device,
    FeatherIcon,
  },
  created() {
    this.checkTokenValidity();
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },


    async checkTokenValidity() {
      try {
        //get token from cookie
        this.token = this.getCookie('token');
        const response = await axios.get('https://f2iz1i1t1w1m.share.zrok.io/auth', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          this.isValidToken = true;
        } else {
          this.isValidToken = false;
        }
        this.isLoading = false;
      } catch (error) {
        console.error('Error validating token:', error);
        this.isValidToken = false;
        this.isLoading = false;
      }
    },
    async getDevices() {
      const response = await axios.post('https://f2iz1i1t1w1m.share.zrok.io/api/v1/list_devices', {
        auth: this.token
      });

      if (response.status === 200) {
        // set vue
        this.devices = response.data;
        console.log('Devices:', this.devices);
      } else {
        console.error('Error getting devices:', response);
      }
    }
  },
  mounted() {
  },
  watch: {
    isValidToken(newVal) {
      if (newVal) {
        this.getDevices();
        console.log('Getting devices...');
        console.log(this.devices);
      }
    }
  },
}
</script>

<style scoped>
.icon-div {
  margin-right: 15px;
  transition: color 0.3s ease-in-out;
}

.nav-icons>* {
  margin-left: 30px;
  /* Adjust the margin-left value as desired */
}

.icon-div:hover {
  color: #00b4d8;
}
</style>
