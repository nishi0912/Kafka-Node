import mongoose from "mongoose";
import { templates_schema } from "../Schema/templates.schema.js";

// Templates model creation
export const Templates = mongoose.model("Template", templates_schema);
