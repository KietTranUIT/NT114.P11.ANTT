const express = require("express");
const router = express.Router();
const key = require("../config/key");

router.get("/login/google", async (req, res) => {
  try {
    console.log("hello");
    const state = "some_state";
    const scopes = key.google.scopes.join(" ");
    // redirect
    const url = `${key.google.oauthURL}?client_id=${key.google.clientId}&redirect_uri=${key.google.callBackURL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(url);
  } catch (error) {
    res.status(500).json(errorObj.createInternalError(error.message));
  }
});

module.exports = router;
