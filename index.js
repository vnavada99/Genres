const express = require('express')
const app = express()
var fs = require('fs')
var path = require('path')
const routes = require("./routers/genres.js")
const helmet = require('helmet')
const morgan = require("morgan")

app.use(helmet())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join("./log", 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json());
app.use("/api/genres",routes);
app.use(express.static("public"))
console.log(process.env.NODE_ENV)
console.log(app.get('env'))

const port = process.env.port || 3000;
app.listen(port)
console.log(`Listening on port ${port}`);