const uniqid = require('uniqid');

// cubes database
const cubes = [
  {
    id: '1cww4112qplmyzvqmi',
    name: 'Alexei Popov',
    description: '111',
    imageUrl: 'imageURLTest',
    difficultyLevel: 1,
  },
  {
    id: '1cww4112qplmyzvzoa',
    name: 'Gosho',
    description: 'very nice guy',
    imageUrl: 'dasd',
    difficultyLevel: 4,
  },
  {
    id: '1cww4112qplmyzxte6',
    name: 'Cube3',
    description: 'colorful cube',
    imageUrl:
      'https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg',
    difficultyLevel: 3,
  },
];

// cube service functionality
exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);
  return newCube;
};

exports.getAll = (search, from, to) => {
  let filterCubes = [...cubes];
  if (search) {
    filterCubes = filterCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (from) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel >= Number(from)
    );
  }
  if (to) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel <= Number(to)
    );
  }

  return filterCubes;
};

exports.getSingleCube = (id) => {
  return cubes.find((cube) => cube.id === id);
};
