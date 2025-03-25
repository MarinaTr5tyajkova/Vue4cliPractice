<template>
    <nav class="navbar">
      <div class="navbar-left">
        <router-link to="/">Главная</router-link>
        <router-link v-if="isAuthenticated && userRole === 'client'" to="/orders">Мои заказы</router-link>
      </div>
      <div class="navbar-right">
        <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
        <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
        <button v-if="isAuthenticated" @click="logout">Выйти</button>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['isAuthenticated', 'userRole']),
    },
    methods: {
      ...mapActions(['logout']),
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f8f9fa;
  }
  .navbar a {
    margin-right: 1rem;
    text-decoration: none;
    color: #007bff;
  }
  .navbar button {
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>