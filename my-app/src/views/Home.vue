<template>
    <div class="home">
      <h1>Каталог товаров</h1>
      <div v-if="loading">Загрузка...</div>
      <div v-else>
        <div v-for="product in products" :key="product.id" class="product-card">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Цена: {{ product.price }} руб.</p>
          <button
            v-if="isAuthenticated && userRole === 'client'"
            @click="addToCart(product)"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import apiClient from '@/apiClient';
  
  export default {
    data() {
      return {
        products: [],
        loading: true,
      };
    },
    computed: {
      ...mapState(['isAuthenticated', 'userRole']),
    },
    methods: {
      ...mapActions(['addToCart']),
      async fetchProducts() {
        try {
          const response = await apiClient.getProducts();
          this.products = response.data.data;
        } catch (error) {
          console.error('Ошибка при загрузке товаров:', error);
        } finally {
          this.loading = false;
        }
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 1rem;
  }
  .product-card {
    border: 1px solid #ddd;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
  }
  .product-card button {
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>