<template>
    <transition name="modal-fade">
      <div class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-content">
            <h3 class="modal-title">Подтверждение выхода</h3>
            <p class="modal-text">Вы уверены, что хотите выйти из системы?</p>
            
            <div class="modal-actions">
              <button class="confirm-btn" @click="logout">
                Да, выйти
              </button>
              <button class="cancel-btn" @click="closeModal">
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      logout() {
        this.$store.dispatch('LOGOUT')
          .then(() => {
            this.$router.push('/login');
          });
      },
      closeModal() {
        this.$emit('close');
      }
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 400px;
    overflow: hidden;
  }
  
  .modal-content {
    padding: 2rem;
    text-align: center;
  }
  
  .modal-title {
    color: #2563eb;
    margin-bottom: 1rem;
    font-size: 1.4rem;
  }
  
  .modal-text {
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
  
  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .confirm-btn, .cancel-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 0.95rem;
  }
  
  .confirm-btn {
    background-color: #2563eb;
    color: white;
  }
  
  .confirm-btn:hover {
    background-color: #1e4bb6;
  }
  
  .cancel-btn {
    background-color: #f0f4f8;
    color: #4a5568;
  }
  
  .cancel-btn:hover {
    background-color: #e2e8f0;
  }
   
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  </style>