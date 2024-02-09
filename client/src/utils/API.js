import axios from 'axios';

const API_URL = 'https://64.111.99.88:3001';

// User related API calls
export const getMemberId = (memberId) => {
  return axios.get(`${API_URL}/api/members/${memberId}`);
};

export const getMembers = () => {
  return axios.get(`${API_URL}/api/members`);
};

export const createUser = (userData) => {
  return axios.post(`${API_URL}/api/users`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/api/users/login`, userData);
};

// Menu related API calls
export const getTodaysMenu = () => {
  return axios.get(`${API_URL}/api/menu/today`);
};

export const deleteSpecial = (id) => {
  return axios.delete(`${API_URL}/api/menu/${id}`);
};

export const createSpecial = (specialData) => {
  return axios.post(`${API_URL}/api/menu`, specialData);
};

export const getSpecials = () => {
  return axios.get(`${API_URL}/api/menu`);
};

// News related API calls
export const getNews = () => {
  return axios.get(`${API_URL}/api/news`);
};

export const createNews = (newsData) => {
  return axios.post(`${API_URL}/api/news`, newsData);
};

export const updateNews = (newsData) => { 
  return axios.put(`${API_URL}/api/news/${newsData.id}`, newsData);
};

// News related API calls
export const deleteNews = (id) => {
  return axios.delete(`${API_URL}/api/news/${id}`);
};

// Calendar related API calls
export const getCalendar = () => {
  return axios.get(`${API_URL}/api/calendar`);
};

export const createCalendar = (calendarData) => {
  return axios.post(`${API_URL}/api/calendar`, calendarData);
};

export const deleteCalendar = (id) => {
  return axios.delete(`${API_URL}/api/calendar/${id}`);
};

// Gallery related API calls
export const getGallery = () => {
  return axios.get(`${API_URL}/api/gallery`);
};

export const createGallery = (galleryData) => {
  return axios.post(`${API_URL}/api/gallery`, galleryData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateGallery = (galleryData) => {
  return axios.put(`${API_URL}/api/gallery/${galleryData._id}`, galleryData);
};

export const deleteGallery = (id) => {
  return axios.delete(`${API_URL}/api/gallery/${id}`);
};

export const getGalleryItem = (id) => {
  return axios.get(`${API_URL}/api/gallery/${id}`);
};

export const addReaction = (galleryId, galleryData) => {

  return axios.post(`${API_URL}/api/gallery/${galleryId}/reaction`, galleryData);
};

export const deleteReaction = (galleryId, reactionId) => {
  return axios.delete(`${API_URL}/api/gallery/${galleryId}/reaction/${reactionId}`);
};

// TV related API calls
export const getTV = () => { 
  return axios.get(`${API_URL}/api/tv`);
};

// External API Calls
export const getWeather = () => {
  return axios.get('https://api.weather.gov/gridpoints/TAE/121,56/forecast');
};

export const getTides = () => {
  return axios.get('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8727695&product=predictions&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english&application=DataAPI_Sample&format=json');
};


