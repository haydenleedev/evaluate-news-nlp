const projectData = {}

const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var aylien = require("aylien_textapi");

// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary.
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });


const app = express()

console.log(`Your API key is ${process.env.API_KEY}`);


/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


const port = 8081;

// designates what port the app will listen to for incoming requests
const server = app.listen(port, listening);

// designates what port the app will listen to for incoming requests
function listening() {
    console.log(`${server} running`);
    console.log(`Example app listening on port  ${port}!`);
}

const allData = [];


app.get('/get', function (req, res) {
    textapi.sentiment({    
    text: "Coco!",   
        mode: 'Document' },  
        function(error, response) {  
            if (error === null) {    
            //add your code here for manipulating response }
            
            // res.send(projectData); 
                res.send(response); 
                console.log("response: " + response);
            }
            console.log("response2: " + response);
        }
    );
})

app.post('/inputText', function (req, res) {
    textapi.sentiment({    
    text: req.body.text,   
    //text: "coco!",
        mode: 'Document' },  
        function(error, response) {  
            if (error === null) {    
            //add your code here for manipulating response }

                const newEntry = {
                    polarity: response.polarity, 
                    subjectivity: response.subjectivity, 
                    text: response.text, 
                    polarity_confidence: response.polarity_confidence, 
                    subjectivity_confidence: response.subjectivity_confidence
                }
                const test = JSON.stringify(response);
                console.log("postData server:  " + test);
                allData.push(newEntry);

                const test2 = JSON.stringify(allData);
                console.log("response: " + test2);
                res.send(newEntry);
            }
           
        }
    );
})


app.get('/allData', getAllData);

function getAllData(req, res) {
    res.send(allData);
    const test = JSON.stringify(allData);
    console.log("allData: " + test);
}
