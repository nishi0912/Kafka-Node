import kafka from "../index.js";
import {} from "dotenv/config";

const push_notification_producer = kafka.producer();

export class PushNotificationServiceProducer {
  constructor(props) {
    this.data = {
      idToken: props.idToken,
      content: props.content,
    };
  }

  async setPushNotificationProducer() {
    // Here props are dynamically received data.
    await push_notification_producer.connect();

    await push_notification_producer
      .send({
        topic: process.env.PUSHNOTIFICATION_SERVICE_TOPIC,
        messages: [
          {
            value: JSON.stringify(this.data),
          },
        ],
      })
      .then((res) => {
        console.log("------------------------------------------------");
        console.log("Produced Push notification", { res });
      });

    await push_notification_producer.disconnect();
  }
}
