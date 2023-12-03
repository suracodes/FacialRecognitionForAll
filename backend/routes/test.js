const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
const testRoutes = express.Router();

/**
 * Used for testing status 500 page
 *
 * */
testRoutes.route("/status-500").get(async function (req, res) {
  // enable CORS
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    return res.status(204).send("");
  } else {
    console.log("Write your function here");
    return res.status(200).send("Hello World");
  }
});

// /**
//  * Used for getting password of user
//  *
//  * */
// testRoutes.route("/check-login").get(async function (req, res) {
//   // enable CORS
//   res.set("Access-Control-Allow-Origin", "*");
//
//   if (req.method === "OPTIONS") {
//     // Send response to OPTIONS requests
//     res.set("Access-Control-Allow-Methods", "POST");
//     res.set("Access-Control-Allow-Headers", "Content-Type");
//     res.set("Access-Control-Max-Age", "3600");
//     return res.status(204).send("");
//   } else {
//     console.log("Write your function here");
//     console.log(req.data);
//     return res.status(200).send("Hello World");
//   }
// });

module.exports = testRoutes;
