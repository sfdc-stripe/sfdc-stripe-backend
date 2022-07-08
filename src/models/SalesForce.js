const {
  org,
  orgAuthenticate,
  orgQuery,
  orgRefreshToken,
  orgInsert,
} = require("../salesforce");
const OAuth = require("./OAuth");
const OAuthState = require("./OAuthState");
const { randomUUID } = require("crypto");
const nforce = require("nforce");

const startLogin = async (userId, referer) => {
  const state = randomUUID();
  await OAuthState.upsert({ state, userId, referer });
  return org.getAuthUri() + "&state=" + state;
};

const queryUser = async (email, userId, oauth) => {
  try {
    const contacts = (
      await orgQuery({
        query: `Select id, Phone, Title, Email, Name, Account.name, Account.annualRevenue, Account.numberOfEmployees, Account.website, Account.billingCountry, Account.billingCity from Contact WHERE Email = '${email}'`,
        oauth,
      })
    ).records.map((record) => ({
      ...record._fields,
      link: `${oauth.instance_url}/lightning/r/Contact/${record._fields.id}/view`,
    }));
    const contact = contacts[0];
    if (!contact) return {};
    const tasks = (
      await orgQuery({
        query: `Select Id, Subject, TaskSubType, Who.Id from Task where Who.Id = '${contact.id}'`,
        oauth,
      })
    ).records.map((record) => ({
      ...record._fields,
      link: `${oauth.instance_url}/lightning/r/Task/${record._fields.id}/view`,
    }));

    const notes = (
      await orgQuery({
        query: `Select Id, Body from FeedItem Where ParentID = '${contact.id}'`,
        oauth,
      })
    ).records
      .map((record) => ({
        ...record._fields,
        link: `${oauth.instance_url}/lightning/r/FeedItem/${record._fields.id}/view`,
      }))
      .reverse();

    const cases = (
      await orgQuery({
        query: `SELECT Id, AccountId, Subject, CaseNumber FROM Case Where Contact.Id = '${contact.id}'`,
        oauth,
      })
    ).records.map((record) => ({
      ...record._fields,
      link: `${oauth.instance_url}/lightning/r/Case/${record._fields.id}/view`,
    }));
    return {
      contact,
      tasks,
      notes,
      cases,
    };
  } catch (err) {
    if (err.message === "Session expired or invalid") {
      const newOauth = await orgRefreshToken({ oauth });
      await OAuth.update(
        { salesforceOAuth: JSON.stringify(newOauth) },
        { where: { userId } }
      );
      return queryUser(email, userId, newOauth);
    } else {
      throw err;
    }
  }
};

const sendChatter = async (message, email, oauth) => {
  try {
    const contacts = (
      await orgQuery({
        query: `Select id from Contact WHERE Email = '${email}'`,
        oauth,
      })
    ).records.map((record) => ({
      ...record._fields,
      link: `${oauth.instance_url}/lightning/r/Contact/${record._fields.id}/view`,
    }));
    const contact = contacts[0];
    const feedItem = nforce.createSObject("FeedItem");
    feedItem.set("Body", message);
    feedItem.set("ParentId", contact.id);
    await orgInsert({ sobject: feedItem, oauth: oauth });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  startLogin,
  queryUser,
  sendChatter,
  authenticate: orgAuthenticate,
};
