import { Kafka, logLevel } from "kafkajs";
import {} from "dotenv/config";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER_1],
  logLevel: logLevel.ERROR,
});

export default kafka;
