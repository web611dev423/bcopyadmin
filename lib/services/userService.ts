import api from '../axios';

export const userService = {
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
}; 