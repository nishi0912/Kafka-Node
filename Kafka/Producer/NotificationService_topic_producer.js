import kafka from "../index.js";
import {
  casedata1,
  casedata2,
  casedata3,
  casedata4,
  casedata5,
  casedata6,
} from "../../Data/index.js";

const producer = kafka.producer();

export const NotificationServiceProducer = async (params) => {
  await producer.connect();

  await producer
    .send({
      topic: "NotificationService.topic",
      partition: 0,
      messages: [
        {
          value: JSON.stringify(eval(params)),
        },
      ],
    })
    .then((res) => {
      console.log("---------- Produced a Topic message -----------");
      console.log({ res });
    });

  await producer.disconnect();
};
