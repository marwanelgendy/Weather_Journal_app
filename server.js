// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');
var bodyParser = require('body-parser');
// Start up an instance of app
var app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Get route to Send Data
app.get('/route',(req,res)=>{
    res.send(projectData);
});

app.post('/addData',(req,res)=>{
    projectData.date = req.body.date;
    projectData.temp =req.body.temp;
    projectData.content = req.body.content;
    //console.log(projectData);
    res.end();
});


const port = 3000;
// Setup Server
app.listen(port,()=>{
    console.log(`running on localhost: ${port}`);
    //console.log(__dirname+'/website/index.html');
 });