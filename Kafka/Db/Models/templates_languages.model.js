import mongoose from "mongoose";
import { templates_languages_schema } from "../Schema/templates_languages.schema.js";

// Templates Languages model creation.
export const TemplatesLanguages = mongoose.model(
  "TemplateLanguage",
  templates_languages_schema
);
