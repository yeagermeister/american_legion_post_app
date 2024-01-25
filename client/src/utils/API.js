
// User related API calls
export const getMemberId = (memberId) => {
  return fetch(`/api/members/${memberId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getMembers = () => {
  return fetch('/api/members', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Menu related API calls
export const getTodaysMenu = () => {
  return fetch('/api/menu/today', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteSpecial = (id) => {
  return fetch(`/api/menu/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createSpecial = (specialData) => {
  return fetch('/api/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(specialData),
  });
};

export const getSpecials = () => {
  return fetch('/api/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// News related API calls
export const getNews = () => {
  return fetch('/api/news', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createNews = (newsData) => {
  return fetch('/api/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newsData),
  });
};

export const updateNews = (newsData) => { 
  console.log(newsData);
  return fetch(`/api/news/${newsData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newsData),
  });
};

export const deleteNews = (id) => {
  return fetch(`/api/news/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Calendar related API calls
export const getCalendar = () => {
  return fetch('/api/calendar', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createCalendar = (calendarData) => {
  return fetch('/api/calendar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(calendarData),
  });
};

export const deleteCalendar = (id) => {
  return fetch(`/api/calendar/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Gallery related API calls
export const getGallery = () => {
  return fetch('/api/gallery', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createGallery = (galleryData) => {
  console.log(...galleryData);
  return fetch('/api/gallery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: galleryData,
  });
};

export const updateGallery = (galleryData) => {
  return fetch(`/api/gallery/${galleryData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(galleryData),
  });
};

export const deleteGallery = (id) => {
  return fetch(`/api/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getGalleryItem = (id) => {
  return fetch(`/api/gallery/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const addReaction = (galleryId, galleryData) => {
  console.log(galleryId, galleryData);
  return fetch(`/api/gallery/${galleryId}/reaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(galleryData),
  });
};

export const deleteReaction = (galleryId, reactionId) => {
  return fetch(`/api/gallery/${galleryId}/reaction/${reactionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


// TV related API calls
export const getTV = () => { 
  return fetch('/api/tv', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};






// // save book data for a logged in user
// export const saveBook = (bookData, token) => {
//   return fetch('/api/users', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(bookData),
//   });
// };

// // route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// // remove saved book data for a logged in user
// export const deleteBook = (bookId, token) => {
//   return fetch(`/api/users/books/${bookId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// // make a search to google books api
// // https://www.googleapis.com/books/v1/volumes?q=harry+potter
// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };
