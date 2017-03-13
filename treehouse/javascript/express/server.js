const express = require('express'),
      posts = require('./mock/posts.json'),
      jsonParser = require('body-parser').json;

const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(jsonParser());

app.use('/questions', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});