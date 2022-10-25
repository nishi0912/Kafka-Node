import { findUser } from "../Kafka/Db/Queries/index.js";
import { NotificationService } from "../src/Services/NotificationService.js";

const checkSubscriptions = async (data) => {
  return await findUser(data, "value");
};

const push_subscription_rules = {
  id: 5,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("---->  Via Push notification...");
    console.log(
      "------------------------------------------------------------------------"
    );

    const check_push_subscription = (await checkSubscriptions(this.userid))
      ?.isPushUnsub;

    console.log(
      "------>  Checking Push subscription...",
      !check_push_subscription
    );
    // Convert the condition to false as result.
    await R.when(!check_push_subscription);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("Subscribed to Push notifications.");
    this.notificationType = "push";
    await R.stop();
  },
};

const sms_subscription_rules = {
  id: 7,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("---->  Via Sms notification...");

    const check_sms_subscription = (await checkSubscriptions(this.userid))
      ?.isSmsUnsub;

    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(
      "------>  Checking Sms subscription...",
      !check_sms_subscription
    );
    await R.when(!check_sms_subscription);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("Subscribed to Sms notifications.");
    this.notificationType = "sms";
    await R.stop();
  },
};

const email_subscription_rules = {
  id: 9,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("---->  Via Email notification...");
    const check_email_subscription = (await checkSubscriptions(this.userid))
      ?.isEmailUnsub;

    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(
      "------>  Checking Email notification subscription...",
      !check_email_subscription
    );
    // Convert the condition to false as result.
    await R.when(!check_email_subscription);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("Subscribed to Email notifications.");
    this.notificationType = "email";
    // const content = new NotificationService();
    // content.perform("Email");
    await R.stop();
  },
};

export {
  push_subscription_rules,
  sms_subscription_rules,
  email_subscription_rules,
};
