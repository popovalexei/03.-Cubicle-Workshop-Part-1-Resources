const router = require('express').Router();

//When the user is on the home page and clicks on Add a Cube we render the create.hbs from the views
router.get('/create', (req, res) => {
  res.render('create');
});

module.exports = router;
