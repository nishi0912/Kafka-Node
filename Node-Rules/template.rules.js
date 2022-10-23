import filter from "lodash/filter.js";
import keys from "lodash/keys.js";
import {
  findTemplate,
  findTemplateLanguages,
  findUser,
} from "../Kafka/Db/Queries/index.js";

export const required_params_rule = {
  id: 3,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> Template was found.");
    console.log(
      "------------------------------------------------------------------------"
    );
    const template = await findTemplate(this.templateType, "value");
    let checkTemplateLanguages = keys(
      (await findTemplateLanguages(template[0]?._id, "value"))[0]?.description
    );
    console.log("----> Checking template languages...", checkTemplateLanguages);
    const content_language = filter(checkTemplateLanguages, (language) => {
      return language === this.userLocale;
    });
    this.language = content_language?.length > 0 ? content_language[0] : "en";
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(
      content_language?.length === 0
        ? `------> User language was not found in template. Switching to default language --> ${this.language} `
        : `------> User language was found in templates --> ${this.language}`
    );
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(
      "--> Checking Required params...",
      template[0]?.requiredParams?.length > 0
    );
    await R.when(!template[0]?.requiredParams?.length > 0);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("Template is not found.");
    await R.stop();
  },
};

export const template_rules = {
  id: 2,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> User was found.");
    this.userLocale = (await findUser(this.userid, "value"))?.userLocale;
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> Checking user language -->", this.userLocale);
    console.log(
      "------------------------------------------------------------------------"
    );
    const isTemplateFound = await findTemplate(this.templateType, "boolean");
    console.log("--> Checking template...", isTemplateFound);
    await R.when(!isTemplateFound);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> Template is not found");
    await R.stop();
  },
};

const template_rules_array = [template_rules, required_params_rule];

export { template_rules_array };
