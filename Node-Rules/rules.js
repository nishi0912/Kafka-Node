import { notification_rules_array } from "./notification.rules.js";
import { template_rules_array } from "./template.rules.js";
import { user_rules } from "./user.rules.js";
import { validation_rules } from "./validation.rules.js";

const rules = [
  validation_rules,
  user_rules,
  ...template_rules_array,
  ...notification_rules_array,
];

export { rules };
