import mongoose, { Types } from "mongoose";

// User schema creation
export const users_schema = new mongoose.Schema({
  email: { type: String, uniq: true, required: true },
  phoneNumber: { type: Number, uniq: true },
  userLocale: {
    type: String,
    uniq: true,
    required: true,
    default: "en",
  },
  androidPushToken: { type: String },
  isEmailUnsub: { type: Boolean, default: false },
  isSmsUnsub: { type: Boolean, default: false },
  isPushUnsub: { type: Boolean, default: false },
});
