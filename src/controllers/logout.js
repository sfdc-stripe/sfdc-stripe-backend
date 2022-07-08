const { handleError } = require("../utils");
const Stripe = require("../models/Stripe");
const SalesForce = require("../models/SalesForce");
const OAuth = require("../models/OAuth");

// Destroy your session
module.exports = (app) =>
  app.post(
    "/api/logout",
    handleError(async (req, res) => {
      // Verify Stripe signature
      let userId;
      try {
        userId = Stripe.getUserId(req.body);
      } catch (err) {
        res.status(401).send({ type: "stripe", message: err.message });
      }
      await OAuth.destroy({ where: { userId } });
      const redirect = await SalesForce.startLogin(userId, req.body.referer);
      res.status(200).send({ redirect });
    })
  );
