import { findUser } from "../Kafka/Db/Queries/index.js";

export const user_rules = {
  id: 1,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> Validation was successfull.");
    console.log(
      "------------------------------------------------------------------------"
    );
    const isUserFound = await findUser(this.userid, "boolean");
    console.log("--> Checking user...", isUserFound);
    await R.when(!isUserFound);
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("----> User not found.");
    await R.stop();
  },
};
