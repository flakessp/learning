const express = require('express'),
      jsonParser = require('body-parser').json,
      app = express(),
      routes = require('./routes');

const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});