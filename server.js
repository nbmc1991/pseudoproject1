// dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
// const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const morgan = require("morgan")

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Set up the Express App
const app = express();
const PORT = process.env.PORT || 7777;

// const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'secret notes',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess))


//set up Handlebarjs.js engine as default template engine
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(morgan("tiny"))
app.use(routes);

//start the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});