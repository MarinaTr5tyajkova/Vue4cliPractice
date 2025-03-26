import { createStore } from 'vuex';
import { login, register, addCart } from '../utils/api'; 

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
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
  },
});