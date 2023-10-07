const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

//When the user is on the home page '/' we render the index.hbs from the views
router.get('/', async (req, res) => {
  const { search, from, to } = req.query;
  const cubes = await cubeService.getAll(search, from, to);

  const { user } = req;

  res.render('index', { cubes, search, from, to });
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
