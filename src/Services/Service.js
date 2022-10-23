import replace from "lodash/replace.js";
import map from "lodash/map.js";
import filter from "lodash/filter.js";
import find from "lodash/find.js";
import keys from "lodash/keys.js";
import toString from "lodash/toString.js";
import difference from "lodash/difference.js";
import {
  Templates,
  TemplatesLanguages,
  Users,
  UsersNotifications,
} from "../../Kafka/Db/Models/index.js";
import { SmsServiceProducer } from "../../Kafka/Producer/sms_topic_producer.js";
import { EmailServiceProducer } from "../../Kafka/Producer/email_topic_producer.js";
import { PushNotificationServiceProducer } from "../../Kafka/Producer/pushnotification_topic_producer.js";

class Service {
  constructor(props) {
    this.props = props;
    this.errors = [];

    this.user = null;
    this.template = null;

    this.userLanguage = null;
    this.templateLanguages = [];

    this.isSubscribed = false;
    this.type = null;

    var validation = this.validate(this.props);

    // Validation Fact
    const fact = {
      name: "validation",
      type: "check-validation",
    };

    if (validation) {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("Validation is a success.");
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("--> Checking user....");
      this.checkUser(this.props);
    } else {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("Validation error", this.errors[0]);
    }
  }

  validate(props) {
    if (
      props.hasOwnProperty("templateType") &&
      props.hasOwnProperty("userid")
    ) {
      return true;
    } else {
      this.errors.push(
        "Validation failed, template or user or required params is missing"
      );
      return false;
    }
  }

  // Function to check whether "user" exists or not.
  checkUser(props) {
    Users.findById({ _id: props.userid })
      .then((user) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("----> User is found.");
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("------> Checking user languages....");
        this.checkUserLanguage(user);
      })
      .catch((err) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("----> User is not found.");
      });
  }

  // Function to check user language, if user exists.
  checkUserLanguage(props) {
    if (props.userLocale) {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("--------> User language was found -> ", props.userLocale);
    } else {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log(
        "--------> User language was not found. So switching to default language -> 'en'. "
      );
    }
    console.log(
      "--------------------------------------------------------------------------------------------------"
    );
    console.log("--> Checking template....");
    this.checkTemplate(this.props, props);
  }

  // Function to check whether "template" exists or not.
  checkTemplate(props, user) {
    Templates.find({
      templateType: props.templateType,
    })
      .then((template) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("----> Template is found.");
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("------> Checking template languages....");
        this.checkTemplateLanguages(template, user);
      })
      .catch((err) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log("----> Template not found.");
      });
  }

  // Function to check Template languages for selected template.
  checkTemplateLanguages(props, user) {
    TemplatesLanguages.findOne({
      templateId: props[0]?._id,
    })
      .then((template) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log(
          "--------> Template languages was found",
          keys(template.description)
        );
        let languageFound = filter(keys(template.description), (language) => {
          return language === user?.userLocale;
        });
        if (languageFound?.length > 0) {
          console.log(
            "--------------------------------------------------------------------------------------------------"
          );
          console.log(
            `----------> User selected language ${user?.userLocale} is found in above template languages.`
          );
        } else {
          console.log(
            "--------------------------------------------------------------------------------------------------"
          );
          console.log(
            `----------> User selected languages was not found. Switching to default language of templates -> "en".`
          );
        }
        this.checkRequiredParams(props[0]);
      })
      .catch((err) => {
        console.log(
          "--------------------------------------------------------------------------------------------------"
        );
        console.log(
          "--------> Template languages was not found, switching to default template languages as 'en'."
        );
      });
  }

  // Function to check whether "Required parmas" exists in 'template' or not.
  checkRequiredParams(props) {
    if (props?.requiredParams?.length > 0) {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("------------> All check cases have passed.");
      this.handleNotification(this.props);
    } else {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log("----------> Required params was not found.");
    }
  }

  // Function to handle the type of notification and produce the notification.
  async handleNotification(props) {
    const result = await Templates.findOne({
      templateType: props.templateType,
    })
      .then(async (params) => {
        this.user = await Users.findById({
          _id: props.userid,
        })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });

        // Checks whether user is subscribed to any type of notifications with priorities -> 1.Push, 2.Sms, 3. Email.

        if (params?.viaPush) {
          console.log(
            "------------------------------------------------------------------------------------------"
          );
          console.log("via push notification");
          if (this.user?.isPushUnsub) {
            this.isSubscribed = false;
            this.type = "push";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.log(
              "-----> Your are unsubscribed to Push notification. Checking other notification types....."
            );
            // If unsubscribed, then check for other notification types.
            if (params?.viaSms) {
              console.log(
                "-----------------------------------------------------------------------------------------"
              );
              console.log("-----> We are checking sms now.....");
              if (this.user?.isSmsUnsub) {
                this.subscribed = false;
                this.type = "sms";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "-----> Your are unsubscribed from Sms notification, we are checking email now......"
                );
                if (params?.viaEmail) {
                  if (this.user?.isEmailUnsub) {
                    this.subscribed = false;
                    this.type = "email";
                    console.log(
                      "-----------------------------------------------------------------------------------------"
                    );
                    console.log(
                      "------------> You are not subscribed to any type of notifications."
                    );
                  } else {
                    this.isSubscribed = true;
                    this.type = "email";
                    console.log(
                      "-----------------------------------------------------------------------------------------"
                    );
                    console.log(
                      "-----> Subscribed -",
                      this.isSubscribed,
                      "with",
                      this.type
                    );
                  }
                } else {
                  console.log(
                    "-----------------------------------------------------------------------------------------"
                  );
                  console.log(
                    "Template is not able to send through any types."
                  );
                }
              } else {
                this.isSubscribed = true;
                this.type = "sms";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "-----> Subscribed -",
                  this.isSubscribed,
                  "with",
                  this.type
                );
              }
            } else if (params?.viaEmail) {
              if (this.user?.isEmailUnsub) {
                this.isSubscribed = false;
                this.type = "email";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "-----> You are not subscribed to any type of notification."
                );
              } else {
                this.isSubscribed = true;
                this.type = "email";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "-----> Subscribed -",
                  this.isSubscribed,
                  "with",
                  this.type
                );
              }
            }
          } else {
            this.isSubscribed = true;
            this.type = "push";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.log(
              "-----> Subscribed -",
              this.isSubscribed,
              "with",
              this.type
            );
          }
        } else if (params?.viaSms) {
          console.log(
            "------------------------------------------------------------------------------------------"
          );
          console.log("via sms");
          if (this.user?.isSmsUnsub) {
            this.isSubscribed = false;
            this.type = "sms";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.log(
              "-----> Your are unsubscribed to Sms notification. Checking other notification types....."
            );
            if (params?.viaEmail) {
              console.log(
                "-----------------------------------------------------------------------------------------"
              );
              console.log("-----> We are checking email now......");
              if (this.user?.isEmailUnsub) {
                this.isSubscribed = false;
                this.type = "email";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "---------> Your are unsubscribed to all type of notifications."
                );
              } else {
                this.isSubscribed = true;
                this.type = "email";
                console.log(
                  "-----------------------------------------------------------------------------------------"
                );
                console.log(
                  "-----> Subscribed -",
                  this.isSubscribed,
                  "with",
                  this.type
                );
              }
            } else {
              console.log(
                "-----------------------------------------------------------------------------------------"
              );
              console.log(
                "----> Checked subscription of all notification types. Please subscribe to any notification platforms."
              );
            }
          } else {
            this.isSubscribed = true;
            this.type = "sms";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.log(
              "-----> Subscribed -",
              this.isSubscribed,
              "with",
              this.type
            );
          }
        } else if (params?.viaEmail) {
          console.log(
            "-----------------------------------------------------------------------------------------"
          );
          console.log("via email");
          if (this.user?.isEmailUnsub) {
            this.isSubscribed = false;
            this.type = "email";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.error("---> Your are unsubscribed to Email notification.");
          } else {
            this.isSubscribed = true;
            this.type = "email";
            console.log(
              "-----------------------------------------------------------------------------------------"
            );
            console.log(
              "-----> Subscribed -",
              this.isSubscribed,
              "with",
              this.type
            );
          }
        } else {
          console.log(
            "------------------------------------------------------------------------------------------"
          );
          console.log("via nothing");
          return false;
        }
        return params;
      })
      .catch((err) => {
        return "Required Params was not found";
      });

    if (this.isSubscribed) {
      TemplatesLanguages.findOne({ templateId: result?._id })
        .then((res) => {
          const finalParamsArray = filter(result.requiredParams, (a) =>
            find(keys(props.data), (b) => {
              return a === b;
            })
          );

          const contentLanguage = filter(keys(res.description), (language) => {
            return language === this.user.userLocale;
          });

          if (contentLanguage?.length > 0) {
            this.content = res?.description?.[contentLanguage[0]];
          } else {
            this.content = res?.description?.["en"];
          }

          this.paramsDifference = toString(
            difference(result?.requiredParams, finalParamsArray)
          );

          if (finalParamsArray?.length === result?.requiredParams?.length) {
            map(finalParamsArray, (a) => {
              this.content = replace(this.content, a, props.data?.[a]);
            });

            UsersNotifications.create(
              {
                userId: props.userid,
                templateId: result?._id,
                templateData: this.content,
                notificationType: this.type,
              },
              (err, notification) => {
                if (err) console.log({ err });
                if (this.type === "sms") {
                  console.log("-------------------------");
                  console.log("Sms Notification Producer");

                  const SmsProducer = new SmsServiceProducer({
                    number: this.user.phoneNumber,
                    content: notification?.templateData,
                  });

                  SmsProducer.setSmsProducer();
                } else if (this.type === "email") {
                  console.log("----------------------------");
                  console.log("Email Notification Producer");
                  const EmailProducer = new EmailServiceProducer({
                    email: this.user.email,
                    content: notification?.templateData,
                  });

                  EmailProducer.setEmailProducer();
                } else {
                  console.log("--------------------------");
                  console.log("Push Notification Producer");
                  const PushProducer = new PushNotificationServiceProducer({
                    idToken: this.user.id,
                    content: notification?.templateData,
                  });
                  PushProducer.setPushNotificationProducer();
                }
              }
            );
          } else if (
            finalParamsArray?.length > result?.requiredParams?.length
          ) {
            this.content = `${this.paramsDifference} is not present in required params.`;
          } else {
            this.content = `${this.paramsDifference} was not found.`;
          }

          console.log(
            "-----------------------------------------------------------------------------------------"
          );
          console.log("Content -->", this.content);
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
      console.log(
        `----> We were not able to send notification through ${this.type}, please subscribe to ${this.type} notification.`
      );
    }
  }
}

export { Service };
