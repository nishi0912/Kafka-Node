import Rules from "node-rules";
import { rules } from "./rules.js";
import {
  casedata1,
  casedata2,
  casedata3,
  casedata4,
  casedata5,
  casedata6,
  casedata7,
} from "../Data/index.js";
import {} from "dotenv/config";

// Creating Rules instance.
var Rule = new Rules();

const fact = process.env.DATA;

Rule.register(rules);
Rule.ignoreFactChanges = true;
Rule.execute(eval(fact), (data) => {
  // console.log({ data });
});

export { Rule };
