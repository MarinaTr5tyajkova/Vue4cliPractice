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