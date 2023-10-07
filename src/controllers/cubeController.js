const router = require('express').Router();
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');
const { difficultyLevelOptionsViewData } = require('../utils/viewData.js');

//When the user is on the home page and clicks on Add a Cube we render the create.hbs from the views
//!Create
router.get('/create', (req, res) => {
  res.render('cube/create');
});

router.post('/create', async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user,
  });
  res.redirect('/');
});

//!Details
router.get('/:cubeId/details', async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();

  if (!cube) {
    res.redirect('/404');
    return;
  }

  const hasAccessories = cube.accessories?.length > 0;
  res.render('cube/details', { cube, hasAccessories });
});

//!Accessory attachment
router.get('/:cubeId/attach-accessory', async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();

  const accessories = await accessoryService
    .getWithoutOwned(cube.accessories)
    .lean();

  const hasAccessories = accessories.length > 0; // view data, template data

  res.render('accessories/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
  const { cubeId } = req.params;
  const { accessory: accessoryId } = req.body;

  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

//!Edit
router.get('/:cubeId/edit', async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
  const options = difficultyLevelOptionsViewData(cube.difficultyLevel);

  res.render('cube/edit', { cube, options });
});

//!Delete
router.get('/:cubeId/delete', async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
  const options = difficultyLevelOptionsViewData(cube.difficultyLevel);
  res.render('cube/delete', { cube, options });
});

module.exports = router;
