var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

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

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
