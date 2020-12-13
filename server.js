const colors = require('colors');
const app = require('./src/app');
const config = require('./src/config');
const dbConnector = require('./src/db/connection');

const server = app.listen(config.port);
dbConnector();
console.log(colors.green(`INFO::server started on port ${config.port}`));

const shutdown = () => {
  console.log(colors.yellow('WARN::************shutting down server**************'));
  server.close();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
