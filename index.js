const { Elarian } = require("elarian");
require("dotenv").config();
const log = require("signale");
const restaurants = require("./restaurants");

const newClient = new Elarian({
  orgId: process.env.ORG_ID,
  appId: process.env.APP_ID,
  apiKey: process.env.API_KEY,
});

const smsChannel = {
  number: process.env.SMS_SHORTCODE,
  channel: "sms",
};

const mpesaChannel = {
  number: process.env.MPESA_PAYBILL,
  channel: "cellular",
};

const whatsappChannel = {
  number: "+254791694588",
  channel: "whatsapp",
};

// const handleUssd = async (notification, customer, appData, callback) => {
//   try {
//     const input = notification.input.text;
//     let screen = "home";

//     if (appData) {
//       screen = appData.screen;
//     }

//     const customerData = await customer.getMetadata();

//     let { email, name, password, location } = customerData;

//     const menu = {
//       text: "",
//       isTerminal: false,
//     };

//     let nextScreen = screen;

//     if (screen === "home" && input !== "") {
//       if (input === "1") {
//         nextScreen = "request-email";
//       } else if (input === "2") {
//         nextScreen = "request-password";
//       } else if (input === "3") {
//         nextScreen = "quit";
//       }
//     }

//     switch (nextScreen) {
//       case "quit":
//         menu.text = "Great having you";
//         menu.isTerminal = true;
//         nextScreen = "home";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         break;

//       case "info":
//         name = input;
//         menu.text = `Hello ${name}`;
//         menu.text = "Thank you for joining us,";
//         menu.isTerminal = true;
//         nextScreen = "home";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         break;

//       case "request-email":
//         menu.text = "Please enter your email";
//         nextScreen = "request-name";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         break;

//       case "request-name":
//         menu.text = "Please enter First and Last names";
//         nextScreen = "request-location";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         const resp = await customer.updateMetadata({
//           email: input,
//         });
//         console.log(resp);
//         break;

//       case "request-location":
//         menu.text = "Please enter your location";
//         nextScreen = "set-password";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         await customer.updateMetadata({
//           name: input,
//         });
//         break;

//       case "request-password":
//         menu.text = "Enter your password";
//         (nextScreen = "info"),
//           callback(menu, {
//             screen: nextScreen,
//           });
//         break;

//       case "set-password":
//         menu.text = "Please set a password";
//         nextScreen = "authorize-account";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         await customer.updateMetadata({
//           location: input,
//         });
//         break;

//       case "authorize-account":
//         menu.text = `Great! ${name}, you have joined Elarian! Here are nearby restaurants you can order food from:`;
//         menu.isTerminal = true;
//         nextScreen = "home";
//         callback(menu, {
//           screen: nextScreen,
//         });
//         await customer.updateMetadata({
//           password: input,
//         });
//         break;

//       case "home":
//       default:
//         menu.text = "Welcome to Food Delivery!\n1. Register\n2. Login\n3. Quit";
//         menu.isTerminal = false;
//         callback(menu, {
//           screen: nextScreen,
//         });
//         break;
//     }
//   } catch (error) {
//     log.error("USSD Error: ", error);
//   }
// };

const handleWhatsapp = async (notification, customer, callback) => {
  console.log(notification);

  if (notification.text === "hi") {
    customer.sendMessage(whatsappChannel, {
      body: {
        text: `Hi there!👋\n
        Welcome to Food Delivey! 😋\n
        Please reply with a number... eg 1\n
        1.Get Menu\n
        2.Send an enquiry\n
        3.Give feedback\n
        4.Get recommendations`,
      },
    });
  }
  if (notification.text === "1") {
    customer.sendMessage(whatsappChannel, {
      body: {
        text: "Choose item from menu below \n1. Large Pizza = ksh1500 \n2. Fries= ksh 250  \n3. Chicken =ksh 800 \n4. Minute Maid =ksh 150",
      },
    });
  }
  if (notification.text === "1") {
    customer.sendMessage(whatsappChannel, {
      body: {
        text: "Thank you @username for placing your order. \n You will recieve",
      },
    });
  }
};

//newClient.on("ussdSession", handleUssd);
newClient.on("receivedWhatsapp", handleWhatsapp);

newClient
  .on("error", (error) => {
    console.log("A connection error occurred", error);
  })
  .on("connected", () => {
    console.log("Conection to Elarian has been successful");
  })
  .connect();
