import axios from "@configs/axios";
import { SignupDataType } from "@interfaces/user.interface";

class AuthService {
  private baseUrl;

  constructor() {
    this.baseUrl = "/api/v1/auth";
  }

  getUserPlans = async () => {
    try {
      const _baseUrl = "/api/v1/subscriptions";
      const res = await axios.get(`${_baseUrl}/plans`);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw (error as any).response?.data;
      }
    }
  };

  signup = async (data: SignupDataType) => {
    try {
      const res = await axios.post(`${this.baseUrl}/signup`, data);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw (error as any).response?.data;
      }
    }
  };
}

export default new AuthService();
