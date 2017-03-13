const express = require('express'),
      jsonParser = require('body-parser').json,
      app = express(),
      routes = require('./routes');

const logger = require('morgan');

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