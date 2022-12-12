import {
  Templates,
  TemplatesLanguages,
  Users,
  UsersNotifications,
} from "../Models/index.js";

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

export const Activities_Update = async (data, id) => {
  console.log({ data, id });
  await UsersNotifications.findByIdAndUpdate(
    { _id: id },
    { $push: { activities: { routename: data } } },
    { upsert: true }
  )
    .then((result) => {
      console.log("Route 3 data was saved", { result });
    })
    .catch((err) => {
      console.error(err);
    });
};
