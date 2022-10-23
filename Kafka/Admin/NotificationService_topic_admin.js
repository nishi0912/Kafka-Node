import kafka from "../index.js";
import {} from "dotenv/config";

const admin = kafka.admin();

export const NotificationServiceTopicAdmin = async () => {
  // Admin logger
  admin.logger().info();

  await admin.connect();

  // To fetch metadata of given topic name

  // const topicMeta = await admin.fetchTopicMetadata({
  //   topics: [process.env.DUMMY_TOPIC],
  // });

  // Validate, if the topic exists.

  // const isTopicFound = await admin
  //   .createTopics({
  //     validateOnly: true,
  //     topics: [{ topic: process.env.DUMMY_TOPIC }],
  //   })
  //   .then((res) => {
  //     console.log("Topic found", { res });
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });

  // Create topic

  // const createResponse = await admin
  //   .createTopics({
  //     topics: [
  //       {
  //         topic: process.env.SMS_SERVICE_TOPIC,
  //         numPartitions: 3,
  //         replicationFactor: 1,
  //       },
  //       {
  //         topic: process.env.EMAIL_SERVICE_TOPIC,
  //         numPartitions: 3,
  //         replicationFactor: 1,
  //       },
  //       {
  //         topic: process.env.PUSHNOTIFICATION_SERVICE_TOPIC,
  //         numPartitions: 3,
  //         replicationFactor: 1,
  //       },
  //     ],
  //   })
  //   .then((res) => {
  //     console.log({ res });
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });

  // console.log({ createResponse });
  // Returns true, if created successfully or false.
  // console.log({ createResponse });

  // Delete topic

  // await admin
  //   .deleteTopics({
  //     topics: [
  //       process.env.SMS_SERVICE_TOPIC,
  //       process.env.EMAIL_SERVICE_TOPIC,
  //       process.env.PUSHNOTIFICATION_SERVICE_TOPIC,
  //     ],
  //   })
  //   .then((res) => {
  //     console.log({ res });
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });

  // Delete topic records.

  // const deletedRecords = await admin.deleteTopicRecords({
  //   topic: process.env.DUMMY_TOPIC,
  //   partitions: [
  //     // { partition: 0, offset: "61" }, // delete up to and including offset 29
  //     { partition: 0, offset: "-1" }, // delete all available records on this partition
  //   ],
  // });

  // // Fetch topic offsets.

  // const fetchTopicOffset = await admin.fetchTopicOffsets(
  //   process.env.DUMMY_TOPIC
  // );

  // console.log({ deletedRecords, fetchTopicOffset });

  const res = await admin.listTopics();

  console.log({ res });

  await admin.disconnect();
};
