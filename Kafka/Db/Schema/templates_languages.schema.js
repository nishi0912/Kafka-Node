import mongoose, { Types } from "mongoose";

// Templates Languages schema creation.

export const templates_languages_schema = new mongoose.Schema({
  templateId: { type: Types.ObjectId, required: true, ref: "Template" },
  description: {
    en: { type: String, default: null },
    hi: { type: String, default: null },
    bn: { type: String, default: null },
  },
  locale: { type: String, default: "en" },
});
