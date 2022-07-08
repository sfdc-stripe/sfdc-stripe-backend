const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");
const { port, allowAllOrigins, destroyTables } = require("./config");
const callbackRoute = require("./controllers/callback");
const chatterRoute = require("./controllers/chatter");
const customerRoute = require("./controllers/customer");
const logoutRoute = require("./controllers/logout");

const app = express();

(async () => {
  await sequelize.sync({ force: destroyTables });

  app.use(bodyParser.json());
  app.use(
    cors({
      ...(allowAllOrigins ? {} : { origin: "https://dashboard.stripe.com" }),
    })
  );

  callbackRoute(app);
  chatterRoute(app);
  customerRoute(app);
  logoutRoute(app);

  app.use((req, res, next) => {
    res.status(404).send("Page not found");
  });

  app.disable("x-powered-by");
  app.listen(port, () => {
    console.log(`SFDC Stripe app listening on port ${port}`);
  });
})();
