const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //Key-value pair


app.use((req,res, next) => {
    var time = new Date().toString();
    var log = `${time}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',  (err) => {
        if(err)
        {
            console.log('Unable to append to server log');
        }
    })
        next();
});

/*app.use((req, res) => {
    res.render('maintenance.hbs'); //As there is no next(); The rest of the code is not going to be executed
}); */

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {

  /* res.send('<h2>Hello Express !</h2>');
      res.send({
                name: 'Punyashlok',
                lastName: 'Dash',
                pages_to_check: [
                                'about',
                                'bad',
                                'help.html',
                                'trial.html'] });*/

        res.render('home.hbs',{
            pageTitle: 'Welcome !!',
            para:'Welcome to my first attempt at creating a  web-server on nodejs ',
            author:'Punyashlok Dash'
        });
    });

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Me'
});
});

app.get('/bad',(req,res) => {
        res.send({
                    message: 'Error, Unable to fetch Data'
                });
    })
app.listen(3000, () => {
                            console.log('Server is up');
                        });