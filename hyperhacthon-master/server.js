const express = require('express');
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({extended : false}));

app.get('/',(req,res)=>{
    res.send("api running sucessfuly");
});

app.use('/api/learner',require('./routes/api/learner'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));

const port = 5000 || process.env.PORT ;

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
