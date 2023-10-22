import axios from "@configs/axios";
import { TSignupData } from "@validations/schema/auth.schema";

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

  signup = async (data: FormData) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post(`${this.baseUrl}/signup`, data, config);
      return res;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
