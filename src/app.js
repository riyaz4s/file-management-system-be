const express = require('express');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const _ = require('lodash');
const swaggerDocument = require('../assets/swagger.json');
const routes = require('./routes');
const config = require('./config');

const app = express();
app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  name: '',
  store: new MongoStore(_.get(config, 'db.connectionString')),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));

app.use('/health', (req, res) => res.json({
  health: 'Good',
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/documents', routes.documentsRoute);

app.use((req, res) => res.sendStatus(404));

process.on('uncaughtException', (err) => {
  console.error(`uncaughtException :: ${err.stack}`);
});

process.on('unhandledRejection', (reason) => {
  console.error(`unhandledRejection :: ${reason.stack || reason}`);
});

module.exports = app;
