const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

//When the user is on the home page and clicks on Add a Cube we render the create.hbs from the views
router.get('/create', (req, res) => {
  console.log(cubeService.getAll());
  res.render('create');
});

router.post('/create', (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect('/');
});

module.exports = router;
