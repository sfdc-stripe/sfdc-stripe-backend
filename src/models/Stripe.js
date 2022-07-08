const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const appSecret = process.env.STRIPE_APP_SECRET;
const { unicornMode } = require("../config");

const getUserId = ({ userId, accountId, signature }) => {
  if (unicornMode) {
    return "UNI-CORN";
  }
  const payload = JSON.stringify({
    user_id: userId,
    account_id: accountId,
  });
  stripe.webhooks.signature.verifyHeader(payload, signature, appSecret);
  return accountId;
};

module.exports = { getUserId };
