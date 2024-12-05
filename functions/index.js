const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // configured to be able to read the keys in .env files
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true })); // origin true for all cors to work
app.use(express.json());

//get request
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

//   listening  normally we use app.listen(port,{} )

// post request for payment : sending payment from basket ; payment intent creation; async coz we make a call to stripe and it returns a promise
app.post("/payment/create", async (req, res) => {
  // payment from user using query
  const total = req.query.total;
  //   stripe process only payment>0
  if (total > 0) {
    // console.log("payment received", total);
    // res.send(total);
    //  note stripe.paymentIntents is plural 
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: "usd"
    });
    console.log(paymentIntent);
    res.status(201).json ({
        clientSecret: paymentIntent.client_secret, 
    })
  }else {
    res.status(403).json({
        message:"total payment must be greater than 0"
    })
  }
});
exports.api = onRequest(app); // our app is being served via firebase using firebase's onRequest method instead of listening by itself

//The comments bellow are the comments when functions was created with firebase init

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
