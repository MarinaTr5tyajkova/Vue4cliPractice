<template>
  <header>
    <nav>
      <div class="nav-container">
        <div class="nav-links">
          <router-link to="/">Каталог</router-link>
          <router-link to="/cart">Корзина</router-link>
          <router-link to="/orders" v-if="isAuthenticated">Мои заказы</router-link>
        </div>
        <div class="auth-links">
          <router-link to="/login" v-if="!isAuthenticated">Вход</router-link>
          <router-link to="/signup" v-if="!isAuthenticated">Регистрация</router-link>
          <router-link to="/logout" v-if="isAuthenticated">Выход</router-link>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <router-view />
  </main>

  <footer>
    <p>© 2025 Магазин. Все права защищены.</p>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a1a1a;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

nav {
  width: 100%;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1.5rem;
}

.auth-links {
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
}

header nav a {
  font-weight: 500;
  color: #4a4a4a;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  white-space: nowrap;
}

header nav a:hover {
  color: #2563eb;
}

header nav a.router-link-exact-active {
  color: #2563eb;
  position: relative;
}

header nav a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #2563eb;
}


main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}


footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>