import { Templates, TemplatesLanguages, Users } from "../Models/index.js";

export const findUser = async (data, type) => {
  const result = await Users.findById({ _id: data })
    .then((res) => {
      return type === "boolean" ? true : res;
    })
    .catch((err) => {
      return false;
    });
  return result;
};

export const findTemplate = async (data, type) => {
  const result = await Templates.find({ templateType: data })
    .then((res) => {
      return res?.length > 0 ? (type === "boolean" ? true : res) : false;
    })
    .catch((err) => {
      return false;
    });
  return result;
};

export const findTemplateLanguages = async (data, type) => {
  const result = await TemplatesLanguages.find({ templateId: data })
    .then((res) => {
      return res?.length > 0 ? (type === "boolean" ? true : res) : false;
    })
    .catch((err) => {
      return false;
    });
  return result;
};
