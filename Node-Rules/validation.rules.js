export const validation_rules = {
  id: 0,
  condition: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log("--> Checking validation...");
    // Convert the condition to false as result.
    await R.when(
      Object.keys(this).length === 1 ||
        !this.hasOwnProperty("templateType") ||
        !this.hasOwnProperty("userid")
    );
  },
  consequence: async function (R) {
    console.log(
      "------------------------------------------------------------------------"
    );
    console.log(
      "Validation failed, template or user or required params is missing."
    );
    await R.stop();
  },
};
