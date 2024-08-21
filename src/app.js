const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const {mysqlpool}=require('./db');
const {router}=require('./routes/studentroutes');
const port=7000;

//Middlewares
app.use(express.json());
// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//database connection
mysqlpool.query('select 1')
.then(()=>{
    console.log('connected to mysqldatabase..');
    app.listen(port,()=>{
        console.log(`server is running on port ${port}..`);
    })
})
.catch(err=>{
    console.err('error connecting to mysql database',err);
})

//routes

app.use('/students', router);








