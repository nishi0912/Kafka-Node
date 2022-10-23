// require("dotenv").config();

import {} from "dotenv/config";

import express from "express";
// import receiveMessages from "./Kafka/Consumer/index.js";
import connection from "./Kafka/Db/index.js";

// const express = require("express");
// const mongoose = require("mongoose");

// const sendMessages = require("./Kafka/Producer/Producer");
// const receiveMessages = require("./Kafka/Consumer/Consumer");

// import {sendMessages} from "./Kafka/Producer/Producer";
// import {receiveMessages} from "./Kafka/Consumer/Consumer";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // receiveMessages();
});

connection;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
