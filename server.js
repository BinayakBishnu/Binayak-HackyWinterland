const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;


const app = express()
const u = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'styles')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/signup', u, function (req, res) {
    console.log('Signed In');

    var response = {
        name: req.body.email,
        password: req.body.password
    }

    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
        if (err)
            throw err;
        else
            console.log("mongo connected!")
        var dbo = db.db("studentdata");
        dbo.collection('student').insertOne(response);
    })
    res.sendFile(path.join(__dirname, './pages/home.html'))
})


app.listen(3000, () => {
    console.log('MLHSchools server running!')
})