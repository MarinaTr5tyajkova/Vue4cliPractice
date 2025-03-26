<template>
    <div class="orders-container">
      <h2>Ваши заказы</h2>
      <div v-if="orders.length === 0" class="empty-orders">
        <p>У вас нет заказов.</p>
        <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <h3>Заказ #{{ order.id }}</h3>
          <p>Товары: {{ order.products.join(', ') }}</p>
          <p>Сумма: {{ order.order_price }} руб.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import { fetchOrders } from '@/utils/api';
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    created() {
      this.loadOrders();
    },
    methods: {
      async loadOrders() {
        try {
          const response = await fetch(`${API}/order`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.orders = data.data;
          } else {
            console.error('Ошибка при загрузке заказов');
          }
        } catch (error) {
          console.error('Ошибка при загрузке заказов:', error);
        }
      },
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
  };
  </script>
  
  <style scoped>
  .orders-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .empty-orders {
    text-align: center;
    padding: 3rem 0;
  }
  
  .empty-orders p {
    color: #4A5568;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .continue-shopping {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #2563EB;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  }
  
  .continue-shopping:hover {
    background: #1E4BB6;
  }
  
  .orders-list {
    margin-bottom: 2rem;
  }
  
  .order-item {
    padding: 1.5rem 0;
    border-bottom: 1px solid #EDF2F7;
  }
  
  .order-item h3 {
    margin: 0 0 0.5rem 0;
    color: #2D3748;
    font-size: 1.1rem;
  }
  
  .order-item p {
    margin: 0 0 0.5rem 0;
    color: #718096;
    font-size: 0.9rem;
  }
  </style>
  