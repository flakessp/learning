const express = require('express'),
      jsonParser = require('body-parser').json,
      app = express(),
      routes = require('./routes'),
      logger = require('morgan');
      mongoose = require('mongoose');

// DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/qa');
const db = mongoose.connection;

db.on('error', (err) => {
    console.err(`connection error: ${err}`);
});

db.once('open', () => {
    console.log(`db connection successful!`);
    // All database communication goes here
})

// APP 
app.use(logger('dev'));
app.use(jsonParser());

// Routes
app.use('/questions', routes);

// catch 404 and forward to error handler
app.use((req, res ,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Eror handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});