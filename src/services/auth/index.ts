import axios from "@configs/axios";
import { IVerificationInitValues } from "@interfaces/user.interface";
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

  validateToken = async (cid: string, data: IVerificationInitValues) => {
    try {
      const res = await axios.post(
        `${this.baseUrl}/account_activation/${cid}`,
        data,
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
  resendActivationLink = async (cid: string, token: string) => {
    try {
      const res = await axios.post(`${this.baseUrl}/resend_activation_link`, {
        token,
        cid,
      });
      return res;
    } catch (error) {
      throw error;
    }
  };

  forgotPassword = async (email: string) => {
    try {
      const res = await axios.post(`${this.baseUrl}/forgot_password`, {
        email,
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
}

export default new AuthService();
