import kafka from "../index.js";
import {} from "dotenv/config";

const sms_producer = kafka.producer();

export class SmsServiceProducer {
  constructor(props) {
    this.data = {
      number: props.number,
      content: props.content,
    };
  }

  async setSmsProducer() {
    // Here props are dynamically received data.
    await sms_producer.connect();

    await sms_producer
      .send({
        topic: process.env.SMS_SERVICE_TOPIC,
        messages: [
          {
            value: JSON.stringify(this.data),
          },
        ],
      })
      .then((res) => {
        console.log("------------------------------------------------");
        console.log("Produced Sms Message", { res });
      });

    await sms_producer.disconnect();
  }
}
