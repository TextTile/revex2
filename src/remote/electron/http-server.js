const portfinder = require('portfinder');
var express = require('express')
var app = express()
const path = require("path") 
console.log("serving", path.join(__dirname, 'build'))
app.use(express.static(path.join(__dirname, 'build')))


module.exports = portfinder.getPortPromise()
    .then((port) => {
        app.listen(port, function () {
            console.log(`Example app listening on port ${port}!`)
        })
        return port;
    })
    .catch((err) => {

    });