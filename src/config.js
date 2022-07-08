const port = process.env.PORT || 1337;
const allowAllOrigins = true; // TODO: set to false in prod
const unicornMode = false; // TODO: set to false in prod
const destroyTables = false; // TODO: set to false in prod

module.exports = {
  port,
  allowAllOrigins,
  unicornMode,
  destroyTables,
};
