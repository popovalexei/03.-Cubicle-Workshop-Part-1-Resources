const router = require('express').Router();

router.get('/create', (req, res) => {
  //looks up in the views --> accessories --> and take the file create.hbs
  res.render('accessories/create');
});

module.exports = router;
