// require("dotenv").config();

import {} from "dotenv/config";
import express from "express";
import isNull from "lodash/isNull.js";
import connection from "./Kafka/Db/index.js";
import { EmailServiceProducer } from "./Kafka/Producer/email_topic_producer.js";
import { PushNotificationServiceProducer } from "./Kafka/Producer/pushnotification_topic_producer.js";
import { SmsServiceProducer } from "./Kafka/Producer/sms_topic_producer.js";
// import receiveMessages from "./Kafka/Consumer/index.js";
// const express = require("express");
// const mongoose = require("mongoose");
// const sendMessages = require("./Kafka/Producer/Producer");
// const receiveMessages = require("./Kafka/Consumer/Consumer");
// import {sendMessages} from "./Kafka/Producer/Producer";
// import {receiveMessages} from "./Kafka/Consumer/Consumer";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", (req, res) => {
  console.log(
    "------------------------------------------------------------------------"
  );
  console.log("\x1b[32mResponse By Content-Engine\x1b[0m");
  console.log(
    "------------------------------------------------------------------------"
  );
  const rule_engine_output = req.body;

  console.log({ rule_engine_output });

  if (rule_engine_output?.data?.subscribed && rule_engine_output?.success) {
    if (rule_engine_output?.data?.notificationType === "push") {
      const PushProducer = new PushNotificationServiceProducer({
        idToken: "#Push_id",
        content: rule_engine_output?.content,
      });
      PushProducer.setPushNotificationProducer();
    } else if (rule_engine_output?.data?.notificationType === "sms") {
      const SmsProducer = new SmsServiceProducer({
        number: rule_engine_output?.data?.phoneNumber,
        content: rule_engine_output?.content,
      });

      SmsProducer.setSmsProducer();
    } else if (rule_engine_output?.data?.notificationType === "email") {
      const EmailProducer = new EmailServiceProducer({
        email: rule_engine_output?.data?.email
          ? rule_engine_output?.data?.email
          : rule_engine_output?.data?.phoneNumber,
        content: rule_engine_output?.content,
      });

      EmailProducer.setEmailProducer();
    } else {
      console.log(
        "------------------------------------------------------------------------"
      );
      console.log("\u001b[1;31mWe are not able to Produce content.\x1b[0m");
    }
  } else {
    console.log(`\u001b[1;31m${rule_engine_output?.errors}\x1b[0m`);
    console.log(
      "------------------------------------------------------------------------"
    );
  }
});

connection;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    "------------------------------------------------------------------------"
  );
  console.log(`Now listening on port ${PORT}`);
});

export { app };
