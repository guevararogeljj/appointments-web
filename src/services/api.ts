import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp',
  },
});

export default apiClient;
