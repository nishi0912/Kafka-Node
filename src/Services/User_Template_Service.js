import {
  Templates,
  Users,
  UsersNotifications,
} from "../../Kafka/Db/Models/index.js";

class UserTemplateService {
  constructor(props) {
    this.props = props;
    this.errors = [];

    this.user = null;
    this.template = null;

    var validation = this.validate(props);

    if (validation) {
      this.checkTemplate();
      this.checkUser();
    }
  }

  validate(props) {
    if (props.hasOwnProperty("template") && props.hasOwnProperty("user")) {
      return true;
    } else {
      this.errors.push("Validation failed, template or user is missing");
      return false;
    }
  }

  async checkUser() {
    await Users.findById({ _id: this.props.user })
      .then((user) => {
        this.user = user;
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  async checkTemplate() {
    await Templates.findById({ _id: this.props.template })
      .then((template) => {
        this.template = template;
      })
      .catch((err) => {
        console.log({ err });
      });
  }
}

export { UserTemplateService };

class ChildUserTemplateService extends UserTemplateService {
  constructor(value) {
    super(value);
    this.value = value;
  }

  perform() {
    if (this.errors.count > 0) {
      return this.errors;
    } else {
      UsersNotifications.create(
        {
          userId: this.value.user,
          templateId: this.value.template,
          teamplateData: this.value.to_s,
        },
        (err, notification) => {
          if (err) console.log({ err });
          console.log("Saved", notification);
        }
      );
    }
  }
}

export { NotificationService };
