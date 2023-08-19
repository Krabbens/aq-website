<template>
  <div class="bg-white pb-6 sm:pb-8 lg:pb-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <header class="mb-8 flex items-center justify-between border-b py-4 md:mb-12 md:py-8 xl:mb-16">

        <Logo />
        <Navbar />

      </header>



      <div class="bg-white pb-6 sm:pb-8 lg:pb-12 flex items-center">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8 flex items-center justify-between">

          <!-- Image on the left -->
          <div class="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
            <img src="@/assets/images/login-coverart.jpg" loading="lazy" alt="Landing cover art"
              class="h-full w-full object-cover object-center" />
          </div>



          <!-- Login Form on the right -->
          <form @submit.prevent="handleLogin" class="h-72 overflow-hidden rounded-lg shadow-lg lg:h-auto xl:w-5/12">
            <h2 class="pt-8 mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>
            <div class="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                <input name="email" v-model="username"
                  class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
                <label for="password" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
                <input name="password" v-model="password" type="password"
                  class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <button
                class="block rounded-lg bg-purple-800 mt-4 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-purple-300 transition duration-100 hover:bg-purple-700 focus-visible:ring active:bg-purple-600 md:text-base">Log
                in</button>
            </div>

            <div class="flex items-center justify-center bg-gray-100 p-4">
              <p class="text-center text-sm text-gray-500">Don't have an account? <a href="#"
                  class="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue';
import Logo from '@/components/Logo.vue';
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
      var url = 'https://krabbens.jprq.live/api/v1/login';
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
        .then(response => {
          console.log('Success:', response);
          document.cookie = "token=" + response.token + "; path=/; SameSite=None; Secure";
          // redirect to home
          this.$router.push({ name: 'Home' });
        }
        );
    }
  },
  components: {
    RotatingText,
    Logo,
    Navbar
  }
}
</script>
  
<style scoped></style>
  