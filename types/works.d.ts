import { User } from "./user";

export interface Works {
  id?: number;
  publicId: string;
  user_id: string;
  remote_taskId: string;
  img_description: string;
  resolution: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  created_user?: User;
  status: string;
}
