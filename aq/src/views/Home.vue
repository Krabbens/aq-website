<template>
  <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <header class="mb-8 flex items-center justify-between md:pt-8">

        <Logo />
        <Navbar />

      </header>

      <div v-if="isLoading" class="loading-screen">
        <div class="circle"></div>
      </div>
      <span v-if="isValidToken" class="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Your Devices</span>
      
      <Spacer8 />
      
      <div v-if="isValidToken" class="bg-white py-6 sm:py-8 lg:py-12">
        <div class="grid grid-cols-5 px-4 md:px-8 gap-4">
          <Device v-for="device in devices" :key="device.id" :device="device" @toggle-device="handleDeviceToggle" />
        </div>
      </div>



      <HomePageView v-else />

    </div>
  </div>
</template>

<script>
import FeatherIcon from '@/components/FeatherIcon.vue';
import Device from '@/components/Device.vue';
import Navbar from '@/components/Navbar.vue';
import Logo from '@/components/Logo.vue';
import Spacer8 from '@/components/spacers/Spacer8.vue';
import HomePageView from '@/views/HomePageView.vue'
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
    Navbar,
    HomePageView,
    Logo,
    Spacer8,
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
        const response = await axios.get('https://krabbens.jprq.live/auth', {
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
      const response = await axios.post('https://krabbens.jprq.live/api/v1/list_devices', {
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

<style scoped></style>
