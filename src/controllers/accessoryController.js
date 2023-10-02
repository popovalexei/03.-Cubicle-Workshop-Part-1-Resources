const router = require('express').Router();
const accessoryService = require('./../services/accessoryService.js');

router.get('/create', async (req, res) => {
  //looks up in the views --> accessories --> and take the file create.hbs
  res.render('accessories/create');
});

router.post('/create', async (req, res) => {
  const { name, description, imageUrl } = req.body;
  await accessoryService.create({ name, description, imageUrl });

  res.redirect('/');
});

module.exports = router;
