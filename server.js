const path = require('path')

// import .env
const fs = require('fs');
if (fs.existsSync('.env')) {
    require('dotenv').config()
}

// initialize app
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const server = http.createServer(app)

// parse post requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// serve static files
app.use(express.static(path.join(__dirname, 'www')))

// serve index file
app.get('*', (req, res) => {
    // ng build creates this index.html file within the www folder
    res.sendFile(path.join(__dirname, 'www/index.html'));
})

// fallback to port 3000
const port = process.env.PORT || 3001
server.listen(port, function () {
	console.log("Connected to App")
})