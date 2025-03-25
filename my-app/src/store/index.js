import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    userRole: null, // 'client' или null
    cart: [],
  },
  mutations: {
    SET_AUTH(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.userRole = payload.userRole;
    },
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.cart = [];
    },
  },
  actions: {
    login({ commit }, role) {
      commit('SET_AUTH', { isAuthenticated: true, userRole: role });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
  },
});