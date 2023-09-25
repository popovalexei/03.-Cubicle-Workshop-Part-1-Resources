const router = require('express').Router();

//When the user is on the home page '/' we render the index.hbs from the views
router.get('/', (req, res) => {
  res.render('index');
});

//When the user is on the home page and clicks on About we render the about.hbs from the views
router.get('/about', (req, res) => {
  res.render('about');
});

// when the user enters a non existing /route, we render the 404.hbs from views
router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
