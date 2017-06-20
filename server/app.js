require('./../config/config');

const express = require('express');
const session = require('express-session');
const { mongoose } = require('./db/mongoose');
const { stargazersRoutes } = require('./routes/api/stargazers');
const { reposRoutes } = require('./routes/api/repos');
const { userRoutes } = require('./routes/user');
const { passport } = require('./auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/../public`));

app.use('/user',userRoutes);
app.use('/api/stargazers', stargazersRoutes);
app.use('/api/repos', reposRoutes);

app.listen(port, () => {
    console.log(`Starting server on port ${port}.`);
});

module.exports.app = app;

