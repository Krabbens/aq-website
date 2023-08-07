<template>
    <nav>
      <RouterLink to="/">
        <font-awesome-icon icon="home" title="Home" />
      </RouterLink>
      <RouterLink to="/login">
        <font-awesome-icon icon="sign-in-alt" title="Login" />
      </RouterLink>
      <RouterLink to="/settings">
        <font-awesome-icon icon="cogs" title="Settings" />
      </RouterLink>
    </nav>
  </template>
  
  
  <style scoped>
  nav {
    background-color: #34495e;  /* Darker shade for navbar */
    padding: 1rem 0;
    text-align: center;
  }
  
  nav a {
    margin: 0 1.5rem;
    color: #bdc3c7;  /* Slightly lighter text for better contrast */
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  nav a:hover {
    background-color: #2c3e50;  /* Even darker on hover */
    color: #ecf0f1;  /* White text on hover */
  }
  
  nav i {
    font-size: 24px;
  }
  </style>
  