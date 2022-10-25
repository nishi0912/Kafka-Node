import mongoosedb from "../index.js";
import mongoose, { Types } from "mongoose";

// User notifications schema creation
export const user_notifications_schema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    templateId: { type: Types.ObjectId, required: true, ref: "Template" },
    connectionName: { type: String, uniq: true },
    status: { type: Boolean },
    templateData: { type: String },
    retry_count: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notificationType: { type: String },
    errors: { type: String },
  },
  { supressReservedKeysWarning: true }
);
