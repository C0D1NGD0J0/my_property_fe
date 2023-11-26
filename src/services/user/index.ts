import axios from "@configs/axios";

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
}

export default new UserService();
