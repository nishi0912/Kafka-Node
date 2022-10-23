import mongoose from "mongoose";
import { user_notifications_schema } from "../Schema/index.js";

// Users model creation
export const UsersNotifications = mongoose.model(
  "UserNotification",
  user_notifications_schema
);
