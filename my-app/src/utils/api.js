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