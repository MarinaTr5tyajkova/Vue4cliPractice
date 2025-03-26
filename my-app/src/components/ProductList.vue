<template>
    <div class="products">
      <h1>Список товаров</h1>
      <ul>
        <li class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name">
          <div class="product-price">
            {{ product.price }} руб.
          </div>
          <div :class="{ 'container': isAuthenticated }">
            <div class="product-description">
              {{ product.description }}
            </div>
            <button v-if="isAuthenticated" @click="addToCart(product)">В корзину</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { fetchProducts } from '@/utils/api';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        products: [],
      };
    },
    created() {
      this.loadProducts();
    },
    methods: {
      async loadProducts() {
        try {
          const fetchedProducts = await fetchProducts();
          this.products = fetchedProducts.map(product => ({
            ...product,
            image: `http://lifestealer86.ru/${product.image}`,
          }));
        } catch (error) {
          console.error('Ошибка при загрузке товаров:', error);
        }
      },
      ...mapActions(['addToCartWithAPI']),
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      addToCart(product) {
        const productData = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image
        };
        this.$store.dispatch("addToCartWithAPI", productData)
          .then((successMessage) => {
            alert(successMessage);
            this.$router.push("/");
          })
      },
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
  };
  </script>
  
  <style scoped>
 
h1 {
  margin-bottom: 60px;
  color: #333; 
  text-align: center;
}

.products {
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
}

ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px; 
  list-style: none; 
  padding: 0; 
}


.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border-radius: 12px; 
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0; 
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); 
}


img {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
   
}


.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #007bff; 
  margin: 15px 0;
}


.product-description {
  text-align: center;
  color: #555; 
  font-size: 14px;
  padding: 0 10px 10px;
  min-height: 60px; 
}


button {
  width: 95%;
  padding: 10px;
  margin: 10px auto 20px;
  border: none;
  border-radius: 8px; 
  background: linear-gradient(to right, #007bff, #00bfff); 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  
}

button:hover {
  background: linear-gradient(to right, #0056b3, #0069d9); 
}
  </style>
  