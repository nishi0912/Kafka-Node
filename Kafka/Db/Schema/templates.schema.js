import mongoosedb from "../index.js";
import mongoose, { Types } from "mongoose";

// Templates schema creation.
export const templates_schema = new mongoose.Schema({
  name: { type: String, uniq: true, required: true },
  templateType: { type: String, uniq: true, required: true },
  isMust: { type: Boolean, default: true },
  viaSms: { type: Boolean, default: false },
  viaEmail: { type: Boolean, default: false },
  viaPush: { type: Boolean, default: false },
  priority: { type: String, uniq: true },
  requiredParams: {
    type: Array,
    uniq: true,
  },
});
