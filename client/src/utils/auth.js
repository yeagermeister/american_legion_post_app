import { jwtDecode as decode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      const profile = decode(token);
      
      return profile;
    }
    return null;
  }
  
  

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < (Date.now()/1000)) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }

  isAdmin() {
    const token = this.getToken();
    if (token) {
      const decoded = decode(token);
      return decoded.data.role === 'admin';
      
    }
    return false;
  }

}

export default new AuthService();
