import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://appointmentsgateway-egfpavfabyehg0dp.mexicocentral-01.azurewebsites.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'XApiKey': 'pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
