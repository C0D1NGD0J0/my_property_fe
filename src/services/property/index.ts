import axios from "@configs/axios";
import { IProperty } from "@interfaces/property.interface";

export interface IPropertyService {
  addProperty: (
    cid: string,
    data: FormData,
  ) => Promise<{ success: boolean; data: any; msg: string }>;
  getUserProperties: (
    cid: string,
  ) => Promise<{ success: boolean; data: any; msg: string }>;
}

class PropertyService implements IPropertyService {
  private baseUrl;

  constructor() {
    this.baseUrl = "/api/v1/properties";
  }

  addProperty = async (cid: string, data: FormData) => {
    try {
      if (!cid) {
        throw new Error("cid is required");
      }
      const res = await axios.post<{
        success: boolean;
        data: any;
        msg: string;
      }>(`${this.baseUrl}/${cid}/add_property`, data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      return res;
    } catch (error) {
      throw error;
    }
  };

  getUserProperties = async (cid: string | undefined) => {
    try {
      if (!cid) {
        throw new Error("cid is required");
      }
      const res = await axios.get<{
        success: boolean;
        data: any;
        msg: string;
      }>(`${this.baseUrl}/${cid}/user_properties`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  saveUploadedCSV = async (
    cid: string,
    { fileName, saveAsIs }: { fileName: string; saveAsIs: boolean },
  ) => {
    try {
      if (!cid) {
        throw new Error("cid is required");
      }
      const res = await axios.post<{
        action: "insertionCancelled" | "insertionSuccess";
        success: boolean;
        data: any;
        msg: string;
      }>(`${this.baseUrl}/${cid}/insert_csv`, {
        fileName,
        saveAsIs,
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
}

export default new PropertyService();
