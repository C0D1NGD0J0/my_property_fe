import { IEditClient } from "./user.interface";

export interface IAppResponse<T = unknown> {
  success: boolean;
  data: T;
}

export type FileWithPreview = {
  file: File;
  previewUrl: string;
};
