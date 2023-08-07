<template>
  <div class="container">
    <!-- Navbar -->
    <div class="navbar">
      <div class="logo">aq</div>
      <div>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <!-- Hero Section -->
    <div class="hero">
      <div class="content-box">
        <h1>AQ</h1>
        <p>Kontrola urządzeń domowych</p>
        <div class="spacer"></div>  <!-- Spacer to push button down -->
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
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
/* The CSS from above goes here */
</style>
