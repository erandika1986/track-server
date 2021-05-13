require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri ='mongodb+srv://admin:1qaz2wsx@@cluster0.ivxi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

mongoose.connection.on('connected',() =>{

    console.log('connected to mongo instance');

});

mongoose.connection.on('error',(err) =>{

    console.log('Error connecting to mongo instance',err);

});

app.get('/',requireAuth,(req,res)=>{

    res.send(`Your email : ${req.user.email}`);

});

app.listen(4000,()=>{

    console.log('Listening on port 4000');

});