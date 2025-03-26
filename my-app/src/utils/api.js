const API = '/api';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.user_token;
    } catch (error) {
        console.error('Error during registration:', error.message);
        throw error;
    }
};

export const login = async (user) => {
    try {
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.user_token;
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

export const addCart = async (productId, token) => {
    try {
        const response = await fetch(`${API}/cart/${productId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.message;
    } catch (error) {
        console.error('Error adding to cart:', error.message);
        throw error;
    }
};

export const fetchOrders = async () => {
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
        return data.data;
      } else {
        throw new Error('Ошибка при загрузке заказов');
      }
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
      throw error;
    }
  };
  