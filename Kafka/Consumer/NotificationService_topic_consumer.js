import { NotificationService } from "../../src/Services/index.js";
import kafka from "../index.js";

const consumer = kafka.consumer({ groupId: "kafka-node-app" });

const NotificationServiceTopicConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topics: ["NotificationService.topic"],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const value = message.value.toString();
      const object = JSON.parse(value);
      const res = new NotificationService(object);
      res.perform();
    },
  });
};

export default NotificationServiceTopicConsumer;
