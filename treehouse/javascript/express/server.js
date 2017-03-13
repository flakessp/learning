const express = require('express'),
      posts = require('./mock/posts.json'),
      jsonParser = require('body-parser').json;

const app = express();
const port = process.env.PORT || 3000;

const jsonCheck = (req, res, next) => {
    if(req.body) console.log(`the sky is ${req.body.color}`);
    else console.log(`there is no body property`);
    // console.log(`${req.query.color}`);
    // req.query - passed via ?getparams
    // we can assign property to req object and use it later
    next(); // continue executing the script
};

app.use(jsonCheck);
app.use(jsonParser()); // enables post requests and parsing it later
app.use(jsonCheck);


app.get('/', (req, res) => {
    res.send('Yo!');
});

app.get('/blog', (req, res) => {
    res.send(posts);
})

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});