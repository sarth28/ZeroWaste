import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Restaurants
export const getRestaurants = () => api.get('/restaurants');
export const createRestaurant = (data) => api.post('/restaurants', data);

// NGOs
export const getNGOs = () => api.get('/ngos');
export const createNGO = (data) => api.post('/ngos', data);

// Food Listings
export const getFoodListings = () => api.get('/food');
export const createFoodListing = (data) => api.post('/food', data);

// Matching
export const getMatches = () => api.get('/matches');
export const matchFood = (foodId) => api.post(`/matches/match-food/${foodId}`);

// Analytics
export const getAnalytics = () => api.get('/analytics');

export default api;
