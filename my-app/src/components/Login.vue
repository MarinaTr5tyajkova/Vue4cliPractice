<template>
    <form class="login-form" @submit.prevent="handleSubmit">
      <h1 class="form-title">Вход в систему</h1>
      
      <div class="form-group">
        <label>Email</label>
        <input 
          type="email" 
          v-model="email" 
          placeholder="example@mail.com" 
          @blur="validateEmail"
          :class="{ 'error-input': errors.email }"
        />
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label>Пароль</label>
        <input 
          type="password" 
          v-model="password" 
          placeholder="Введите пароль" 
          @blur="validatePassword"
          :class="{ 'error-input': errors.password }"
        />
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Вход...' : 'Войти' }}
      </button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        errors: {
          email: "",
          password: ""
        },
        isSubmitting: false
      };
    },
    methods: {
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!this.email.trim()) {
          this.errors.email = "Поле обязательно для заполнения";
          return false;
        }
        
        if (!emailRegex.test(this.email)) {
          this.errors.email = "Введите корректный email";
          return false;
        }
        
        this.errors.email = "";
        return true;
      },
      validatePassword() {
        if (!this.password.trim()) {
          this.errors.password = "Поле обязательно для заполнения";
          return false;
        }
        
        if (this.password.includes(' ')) {
          this.errors.password = "Пароль не должен содержать пробелы";
          return false;
        }
        
        this.errors.password = "";
        return true;
      },
      validateForm() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        return isEmailValid && isPasswordValid;
      },
      async handleSubmit() {
        if (!this.validateForm()) return;
        
        this.isSubmitting = true;
        
        try {
          const userData = {
            email: this.email,
            password: this.password
          };
          
          await this.$store.dispatch("AUTH_REQUEST", userData);
          this.$router.push("/");
        } catch (error) {
          console.error('Ошибка входа:', error.message);
          this.errors.password = "Неверный email или пароль";
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  }
  
  .form-title {
    color: #2563eb;
    text-align: center;
    margin-bottom: 1.8rem;
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.95rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
  
  .error-input {
    border-color: #e53e3e !important;
  }
  
  .error-message {
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: 0.3rem;
    display: block;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.9rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 0.5rem;
  }
  
  .submit-btn:hover {
    background-color: #1e4bb6;
  }
  
  .submit-btn:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  @media (max-width: 480px) {
    .login-form {
      padding: 1.5rem;
      margin: 1rem;
    }
    
    .form-title {
      font-size: 1.5rem;
    }
  }
  </style>