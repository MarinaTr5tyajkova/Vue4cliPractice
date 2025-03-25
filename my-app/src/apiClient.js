// src/apiClient.js
const apiClient = {
    async getProducts() {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you need to send the token
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return { data }; // Wrap the data in an object to mimic Axios response structure
      } catch (error) {
        console.error('API call failed:', error);
        throw error;
      }
    },
  };
  
  export default apiClient;