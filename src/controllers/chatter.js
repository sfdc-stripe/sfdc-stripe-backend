const { handleError } = require("../utils");
const Stripe = require("../models/Stripe");
const SalesForce = require("../models/SalesForce");
const OAuth = require("../models/OAuth");

// Post a chatter
module.exports = (app) =>
  app.post(
    "/api/chatter",
    handleError(async (req, res) => {
      // Verify Stripe signature
      let userId;
      try {
        userId = Stripe.getUserId(req.body);
      } catch (err) {
        res.status(401).send({ type: "stripe", message: err.message });
      }
      // Get token from Salesforce and make a query
      const oauthRow = await OAuth.findByPk(userId);
      if (oauthRow) {
        try {
          // TODO: unsafe, need to validate req.body.email - maybe fetch customer on server
          const oauth = JSON.parse(oauthRow.salesforceOAuth);
          await SalesForce.sendChatter(req.body.message, req.body.email, oauth);
          const response = await SalesForce.queryUser(
            req.body.email,
            userId,
            oauth
          );
          res.send(response);
          return;
        } catch (err) {
          console.error(err);
        }
      }
      // Can't get a Salesforce session, ask user to login
      const redirect = await SalesForce.startLogin(userId, req.body.referer);
      res.status(401).send({ type: "salesforce", redirect });
    })
  );
