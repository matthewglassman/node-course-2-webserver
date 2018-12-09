const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//Tell node that we are going to use Partials somewhere
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintanence.hbs', {
//     pageTitle: 'Maintenance',
//     maintMessage: 'The site is currently being worked on'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page',
    welcomeMessage: 'Welcome Home!',
  });

  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Matthew',
  //   likes: [
  //     "food",
  //     "travel"
  //   ]
  // })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
  //res.send('About page here');
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio and Projects',
    portfolioMessage: 'Portfolio Will Go Here'
  });
});
//Create a route a /bad and use res.send to reply with json with an errorMessage propert whose value can be whatever you want.

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
