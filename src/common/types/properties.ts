import { User } from "@supabase/supabase-js";
import { Request } from "express";

export interface PropertiesCustomRequest extends Request {
  user: User
}