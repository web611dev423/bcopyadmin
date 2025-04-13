import api from '../api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  // Add other registration fields as needed
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/admin/login");
      console.log("credentials", credentials);
      const response = await api.post('/admin/login', credentials);
      console.log("response.data", response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await api.post('/admin/register', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/admin/me');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  }
}; 