<template>
    <div class="cart-container">
      <div class="cart-header">
        <h2>Ваша корзина</h2>
        <p v-if="!isAuthenticated" class="auth-warning">
          <router-link to="/login">Войдите</router-link>, чтобы оформить заказ
        </p>
      </div>
  
      <div v-if="cartProducts.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Ваша корзина пуста</p>
        <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
      </div>
  
      <div v-else class="cart-items">
        <div v-for="product in cartProducts" :key="product.id" class="cart-item">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
  
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">{{ product.price }} руб.</div>
          </div>
  
          <div class="product-controls">
            <div class="quantity-control">
              <button @click="decreaseCount(product)" class="quantity-btn minus-btn">-</button>
              <span class="quantity">{{ product.count }}</span>
              <button @click="increaseCount(product)" class="quantity-btn plus-btn">+</button>
            </div>
            <button @click="removeFromCart(product.id)" class="remove-btn">
              Удалить
            </button>
          </div>
        </div>
      </div>
  
      <div v-if="cartProducts.length > 0" class="cart-footer">
        <div class="total-price">
          Итого: {{ totalPrice }} руб.
        </div>
        <button 
          @click="checkout" 
          class="checkout-btn"
          :disabled="!isAuthenticated"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  
  export default {
    methods: {
      increaseCount(product) {
        this.$store.commit('ADD_TO_CART', product);
      },
      decreaseCount(product) {
        if (product.count > 1) {
          this.$store.commit('DECREASE_COUNT', product.id);
        }
      },
      removeFromCart(productId) {
        this.$store.dispatch('removeFromCart', productId);
      },
      checkout() {
        if (this.isAuthenticated) {
          const cartData = this.cartProducts.map(product => ({
            id: product.id,
            quantity: product.count,
          }));
  
          fetch(`${API}/order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(cartData),
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          })
          .then(data => {
            console.log(data);
            // Обработайте успешный ответ от сервера
            this.$router.push('/orders'); // Переход на страницу заказов
            this.$store.dispatch('clearCart'); // Очистка корзины
          })
          .catch(error => {
            console.error('Ошибка при оформлении заказа:', error);
            // Обработайте ошибку
          });
        }
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      ...mapState(['cartProducts']),
      totalPrice() {
        return this.cartProducts.reduce((total, product) => {
          return total + (product.price * product.count);
        }, 0);
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .cart-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #EDF2F7;
    padding-bottom: 1rem;
  }
  
  .cart-header h2 {
    color: #2D3748;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .auth-warning {
    color: #718096;
    margin-top: 0.5rem;
  }
  
  .auth-warning a {
    color: #2563EB;
    text-decoration: none;
  }
  
  .empty-cart {
    text-align: center;
    padding: 3rem 0;
  }
  
  .empty-cart-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #CBD5E0;
  }
  
  .empty-cart p {
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
  
  .cart-items {
    margin-bottom: 2rem;
  }
  
  .cart-item {
    display: flex;
    padding: 1.5rem 0;
    border-bottom: 1px solid #EDF2F7;
    gap: 1.5rem;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .product-info {
    flex-grow: 1;
  }
  
  .product-name {
    margin: 0 0 0.5rem 0;
    color: #2D3748;
    font-size: 1.1rem;
  }
  
  .product-description {
    margin: 0 0 0.5rem 0;
    color: #718096;
    font-size: 0.9rem;
  }
  
  .product-price {
    font-weight: 600;
    color: #2D3748;
  }
  
  .product-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    min-width: 120px;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .quantity-btn {
    width: 32px;
    height: 32px;
    background: #2563EB;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  
  .quantity-btn:hover {
    background: #1E4BB6;
  }
  
  .minus-btn {
    background: #E53E3E;
  }
  
  .minus-btn:hover {
    background: #C53030;
  }
  
  .quantity {
    min-width: 24px;
    text-align: center;
    font-weight: 500;
  }
  
  .remove-btn {
    padding: 0.5rem 1rem;
    background: #F7FAFC;
    color: #E53E3E;
    border: 1px solid #E2E8F0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .remove-btn:hover {
    background: #FED7D7;
    border-color: #FEB2B2;
  }
  
  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid #EDF2F7;
  }
  
  .total-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2D3748;
  }
  
  .checkout-btn {
    padding: 0.75rem 2rem;
    background: #2563EB;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background: #1E4BB6;
  }
  
  .checkout-btn:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
  }
  </style>
  