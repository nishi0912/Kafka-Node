import { UsersNotifications } from "../../Kafka/Db/Models/index.js";
import { Service } from "./Service.js";

class NotificationService extends Service {
  constructor(value) {
    super(value);
    this.value = value;
  }

  perform() {
    if (this.errors.count > 0) {
      return this.errors;
    } else {
      console.log("");
    }
  }
}

export { NotificationService };
