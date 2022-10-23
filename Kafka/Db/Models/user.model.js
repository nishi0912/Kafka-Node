import mongoose from "mongoose";
import { users_schema } from "../Schema/user.schema.js";

// Users model creation
export const Users = mongoose.model("User", users_schema);
