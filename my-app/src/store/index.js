import { createStore } from 'vuex';
import { login, register, addCart } from '../utils/api'; 

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '', 
    cartProducts: [], 
    cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
    order: [],
  },

  getters: {
    isAuthenticated: (state) => !!state.token, 
  },

  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token; 
    },
    AUTH_ERROR: (state) => {
      state.token = ''; 
    },
    ADD_TO_CART(state, product) {
      const existingProduct = state.cartProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.cartProducts.push({ ...product, count: 1 }); 
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartProducts = state.cartProducts.filter((p) => p.id !== productId); 
    },
    DECREASE_COUNT(state, productId) {
      const product = state.cartProducts.find((p) => p.id === productId);
      if (product && product.count > 1) {
        product.count -= 1;
      }
    },
    SAVE_CART_TO_LOCAL_STORAGE(state) {
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
  },

  actions: {
    AUTH_REQUEST: ({ commit }, credentials) => {
      return new Promise((resolve, reject) => {
        login(credentials)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve(token);
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    REGISTER_REQUEST: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        register(userData)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve(token);
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        resolve();
      });
    },
    addToCartWithAPI: ({ commit, state }, productData) => {
      return addCart(productData.id, state.token)  
          .then((message) => {
              commit('ADD_TO_CART', productData);
              commit('SAVE_CART_TO_LOCAL_STORAGE');
              return message;
          });
  },
    
    saveStateCart(context) {
      const cartProducts = context.state.cartProducts; 
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    },
    
    removeFromCart({ commit, dispatch }, productId) {
      commit('REMOVE_FROM_CART', productId); 
      dispatch('saveStateCart');
    },
    decreaseCount({ commit, dispatch }, productId) {
      commit('DECREASE_COUNT', productId); 
      dispatch('saveStateCart');
    },
  },
});