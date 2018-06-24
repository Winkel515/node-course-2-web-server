const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now  = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log')
        }
    });
    console.log(log);
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

//Partials are fragments of an HTML code
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

//Helpers are values that you can inject into HTML code to make a dynamic website
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => { // '/' is for the root route
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'ERROR!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});