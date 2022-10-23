import kafka from "../index.js";
import {} from "dotenv/config";

const email_producer = kafka.producer();

export class EmailServiceProducer {
  constructor(props) {
    this.data = {
      email: props.email,
      content: props.content,
    };
  }

  async setEmailProducer() {
    // Here props are dynamically received data.

    await email_producer.connect();

    await email_producer
      .send({
        topic: process.env.EMAIL_SERVICE_TOPIC,
        messages: [
          {
            value: JSON.stringify(this.data),
          },
        ],
      })
      .then((res) => {
        console.log("------------------------------------------------");
        console.log("Produced Email Message", { res });
      });

    await email_producer.disconnect();
  }
}
