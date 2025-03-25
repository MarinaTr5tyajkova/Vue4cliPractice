<template>
    <form class="register-form" @submit.prevent="handleSubmit">
      <h1 class="form-title">Регистрация</h1>
      
      <div class="form-group">
        <label>Фамилия</label>
        <input 
          type="text" 
          v-model="lastName" 
          placeholder="Иванов" 
          @blur="validateField('lastName')"
        />
        <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
      </div>
      
      <div class="form-group">
        <label>Имя</label>
        <input 
          type="text" 
          v-model="firstName" 
          placeholder="Иван" 
          @blur="validateField('firstName')"
        />
        <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
      </div>
      
      <div class="form-group">
        <label>Отчество</label>
        <input 
          type="text" 
          v-model="middleName" 
          placeholder="Иванович" 
          @blur="validateField('middleName')"
        />
        <span class="error" v-if="errors.middleName">{{ errors.middleName }}</span>
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input 
          type="email" 
          v-model="email" 
          placeholder="example@mail.com" 
          @blur="validateEmail"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label>Пароль</label>
        <input 
          type="password" 
          v-model="password" 
          placeholder="Не менее 6 символов" 
          @blur="validateField('password')"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>
      
      <button type="submit" class="submit-btn">Зарегистрироваться</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
        errors: {
          firstName: "",
          lastName: "",
          middleName: "",
          email: "",
          password: ""
        }
      };
    },
    methods: {
      validateField(field) {
        if (!this[field] || !this[field].trim()) {
          this.errors[field] = "Поле обязательно для заполнения";
          return false;
        }
        this.errors[field] = "";
        return true;
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
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
      validateForm() {
        const isValidFirstName = this.validateField('firstName');
        const isValidLastName = this.validateField('lastName');
        const isValidMiddleName = this.validateField('middleName');
        const isValidEmail = this.validateEmail();
        const isValidPassword = this.validateField('password');
        
        return isValidFirstName && isValidLastName && isValidMiddleName && 
               isValidEmail && isValidPassword;
      },
      handleSubmit() {
        if (!this.validateForm()) return;
        
        const userData = {
          fio: `${this.lastName} ${this.firstName} ${this.middleName}`,
          email: this.email,
          password: this.password
        };
        
        this.$store.dispatch("REGISTER_REQUEST", userData)
          .then(() => this.$router.push("/login"))
          .catch((error) => {
            console.error('Ошибка регистрации:', error.message);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .register-form {
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    color: #2563eb;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .form-group {
    margin-bottom: 1.2rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  
  .error {
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 0.5rem;
  }
  
  .submit-btn:hover {
    background-color: #1e4bb6;
  }
  
  .submit-btn:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  </style>