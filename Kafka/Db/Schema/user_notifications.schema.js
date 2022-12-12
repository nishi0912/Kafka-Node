import mongoosedb from "../index.js";
import mongoose, { Schema, Types } from "mongoose";

// User notifications schema creation
export const user_notifications_schema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    templateId: { type: Types.ObjectId, ref: "Template" },
    connectionName: { type: String, uniq: true },
    status: { type: Boolean },
    activities: [
      {
        routename: { type: String },
      },
    ],
    rawData: { type: Object, max: 100 },
    templateData: { type: String },
    retry_count: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notificationType: { type: String },
    errors: { type: String },
  },
  { supressReservedKeysWarning: true }
);
