import {} from "dotenv/config";
import axios from "axios";
import kafka from "../index.js";
import { Users } from "../Db/Models/user.model.js";
import { casedata1, casedata2, casedata5 } from "../../Data/index.js";
import { UsersNotifications } from "../Db/Models/user_notifications.model.js";

const consumer = kafka.consumer({ groupId: "kafka-node-app" });

const ManageUserTopicConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topics: [process.env.MANAGEUSER_SERVICE_TOPIC],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const value = message.value.toString();
      const object = JSON.parse(value);
      console.log("------------------------------------------");
      console.log("\x1b[32mConsumed Message...\x1b[0m");
      console.log("------------------------------------------");
      console.log(object);

      // Insert the Raw data to User Notification collection -> Get the data from db response and send the data to Rule engine.
      const raw_data = new UsersNotifications({
        rawData: object,
        activities: [
          {
            routename: "Route 1",
          },
        ],
      });

      raw_data.save((err, raw) => {
        if (raw) {
          console.log("------------------------------------------");
          console.log("Raw data is created in User Notification", { raw });
          console.log("------------------------------------------");
          axios
            .post("http://localhost:3002/rule-engine", {
              ...object,
              activity_id: raw?._id,
            })
            .then((response) => {
              console.log("------------------------------------------");
              console.log(
                "\x1b[32m",
                "Data sent successfully to Rule Engine...",
                "\x1b[0m"
              );
              console.log("------------------------------------------");
            })
            .catch((err) => {
              console.log("------------------------------------------");
              console.log("There was problem sending data.");
              console.log("------------------------------------------");
            });
        }
        console.error(err);
      });
    },
  });
};

export default ManageUserTopicConsumer;
