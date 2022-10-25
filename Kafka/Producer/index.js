import { NotificationServiceProducer } from "./NotificationService_topic_producer.js";
import { SmsServiceProducer } from "./sms_topic_producer.js";
import { EmailServiceProducer } from "./email_topic_producer.js";
import { PushNotificationServiceProducer } from "./pushnotification_topic_producer.js";
import {} from "dotenv/config";

NotificationServiceProducer(process.env.DATA);
// SmsServiceProducer();
// EmailServiceProducer();
// PushNotificationServiceProducer();

export default NotificationServiceProducer;
