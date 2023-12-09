import axios from "@configs/axios";
import { IEditClient, IEditUser } from "@interfaces/user.interface";

class UserService {
  private baseUrl;

  constructor() {
    this.baseUrl = "/api/v1/users";
  }

  getCurrentUser = async (cid: string | undefined) => {
    try {
      if (!cid) {
        throw new Error("cid is required");
      }
      const res = await axios.get(`${this.baseUrl}/${cid}/currentuser`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  getUserAccountInfo = async (cid: string) => {
    try {
      const res = await axios.get(`${this.baseUrl}/${cid}/account_info`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  updateUserInfo = async (cid: string, userdata: IEditUser) => {
    try {
      const res = await axios.put(
        `${this.baseUrl}/${cid}/update_account`,
        userdata,
      );
      return res;
    } catch (error) {
      throw error;
    }
  };

  getClientAccountInfo = async (cid: string) => {
    try {
      const res = await axios.get<{
        data: {
          clientInfo: {
            accountType: {
              isEnterpriseAccount: boolean;
            };
            _id: string;
            id: string;
            enterpriseProfile: IEditClient;
          };
        };
      }>(`${this.baseUrl}/${cid}/client_account_info`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  updateClientInfo = async (cid: string, data: FormData) => {
    try {
      const res = await axios.put(
        `${this.baseUrl}/${cid}/update_client_account`,
        data,
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
}

export default new UserService();
