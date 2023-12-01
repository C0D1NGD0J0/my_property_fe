import axios from "@configs/axios";
import { IEditUser } from "@interfaces/user.interface";

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

  getUserEditInfo = async () => {
    try {
      const res = await axios.get(`${this.baseUrl}/user_edit_info`);
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
}

export default new UserService();
