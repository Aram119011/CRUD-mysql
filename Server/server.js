const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const app =express();
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))
app.use(
    bodyParser.urlencoded({extended : false})
)

const user = require('./routes/Users');
const post = require('./routes/post');

app.use('/users', user);
app.use('/api/post', post);

app.listen(port, function(){
    console.log('Server is running on port:' + port)
})
