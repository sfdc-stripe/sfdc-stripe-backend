const nforce = require("nforce");
const { promisify } = require("util");

const org = nforce.createConnection({
  clientId: process.env.SALESFORCE_CONSUMER_KEY,
  clientSecret: process.env.SALESFORCE_CONSUMER_SECRET,
  redirectUri: process.env.SALESFORCE_REDIRECT,
  environment: "production", // 'sandbox' or 'production'
  mode: "multi",
  autoRefresh: false,
});

const orgAuthenticate = promisify(org.authenticate).bind(org);
const orgQuery = promisify(org.query).bind(org);
const orgRefreshToken = promisify(org.refreshToken).bind(org);
const orgInsert = promisify(org.insert).bind(org);

module.exports = {
  org,
  orgAuthenticate,
  orgQuery,
  orgRefreshToken,
  orgInsert,
};
