const { handleError } = require("../utils");
const SalesForce = require("../models/SalesForce");
const OAuth = require("../models/OAuth");
const OAuthState = require("../models/OAuthState");
const { unicornMode } = require("../config");

module.exports = (app) =>
  app.get(
    "/auth/salesforce/callback",
    handleError(async (req, res) => {
      let authReferer;
      if (unicornMode) {
        res.locals.userId = "UNI-CORN";
      } else {
        try {
          const { userId, referer } = await OAuthState.findByPk(
            req.query.state
          );
          authReferer = referer;
          res.locals.userId = userId;
        } catch (err) {}
      }
      if (!res.locals.userId) {
        res.status(400);
        res.send("Salesforce authentication failed, please retry");
        return;
      }
      try {
        const response = await SalesForce.authenticate({
          code: req.query.code,
        });
        await OAuth.upsert({
          salesforceOAuth: JSON.stringify(response),
          userId: res.locals.userId,
        });
        res.redirect(authReferer);
      } catch (err) {
        console.error(err);
        res.status(400);
        res.send("Salesforce authentication failed, please retry");
      }
    })
  );
