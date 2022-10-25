// Cases

// case 1: - OTP in english by user
//         - Templates - ['en', 'hi','bn']
//         - Output - 'Your otp is ****', sent through sms.
const casedata1 = {
  userid: "634d671ade8b556c68df59ad",
  templateType: "OTP",
  data: { otp_secret: "4392" },
};

// case 2: - OTP in hindi by user
//         - Templates - ['en', 'hi','bn']
//         - Output - 'Apka otp hai ****', sent through sms.
const casedata2 = {
  userid: "634d67a0de8b556c68df59ae",
  templateType: "OTP",
  data: { otp_secret: "1934" },
};

// case 3: - OTP in english by user
//         - Templates - ['en', 'hi','bn']
//         - User notification through  - viaPush, viaEmail and viaSms.
//         - Subscribed to - sms.
//         - Output - 'Your otp is ****', sent through Sms.
const casedata3 = {
  userid: "634d6842de8b556c68df59af",
  templateType: "OTP",
  data: { otp_secret: "4392" },
};

// case 4: - OTP in hindi by user
//         - Templates - ['en', 'hi','bn']
//         - User notification through - viaPush, viaEmail and viaSms.
//         - Subscribed to - push and email.
//         - Output - 'Apka otp hai ****', sent through Push(priorities -> 1. push, 2. sms, 3. email).
const casedata4 = {
  userid: "634d68dbde8b556c68df59b2",
  templateType: "OTP",
  data: { otp_secret: "4392" },
};

// case 5: - OTP in bengali by user
//         - Templates - ['en', 'hi','bn']
//         - User notification through  - viaPush, viaEmail and viaSms.
//         - Subscribed to - email.
//         - Output - 'Āpanāra otp haẏa ****', through email.
const casedata5 = {
  userid: "634d6c41de8b556c68df59b3",
  templateType: "OTP",
  data: { otp_secret: "4392" },
};

// case 6: - Welcome in bengali by user
//         - Templates - ['en', 'hi']
//         - User notification through  - viaPush, viaEmail and viaSms.
//         - Subscribed to - email.
//         - Output - 'Welcome, ****' -> If user selected language does not exist in template, it will output default language('en') as the message language.
const casedata6 = {
  userid: "634e75dede8b556c68df59b5",
  templateType: "Welcome",
  data: { user_name: "Dhruv" },
};

// case 6: - Testing in bengali by user
//         - Templates - ['en', 'hi', 'bn]
//         - User notification through  - nothing, defaults to viaPush.
//         - Subscribed to - none.
//         - Output - You are not subscribed to any of above notification types.
const casedata7 = {
  userid: "6354efd3ba34edcc035deb42",
  templateType: "Testing",
  data: { user_name: "Dhruv" },
};

const welcomeData = {
  userid: "63352b42eeb9fe566e0f7e20",
  templateType: "Welcome",
  data: { user_name: "Ramesh" },
};

const otpData = {
  userid: "6349258f458c43e3b8cb71c8",
  templateType: "OTP",
  data: { otp_secret: "4392", name: "Hello" },
};

const pileDueData = {
  userid: "6349258f458c43e3b8cb71c8",
  templateType: "ShivashPileReminder",
  data: {
    pile_name: "Pile 1",
    start_date: "02-07-2022",
    due_date: "29-10-2022",
  },
};

const pileStartData = {
  userid: "63341772eeb9fe566e0f7e14",
  templateType: "ShivashPileCreated",
  data: {
    pile_name: "Pile 3",
    start_date: "24-12-2022",
  },
};

const pileEndData = {
  userid: "63440ebc5d61ea2ad7fb275c",
  templateType: "ShivashPileEnded",
  data: {
    pile_name: "Pile 1",
    end_date: "12-10-2022",
  },
};

export {
  casedata1,
  casedata2,
  casedata3,
  casedata4,
  casedata5,
  casedata6,
  casedata7,
  welcomeData,
  otpData,
  pileDueData,
  pileStartData,
  pileEndData,
};
