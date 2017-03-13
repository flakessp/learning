const express = require('express'),
      posts = require('./mock/posts.json');

const app = express();
const port = process.env.PORT || 3000;

app.use((req,res, next) => {
    console.log(`${req.query.color}`);
    next();
})
app.get('/', (req, res) => {
    res.send('Yo!');
});

app.get('/blog', (req, res) => {
    res.send(posts);
})

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});