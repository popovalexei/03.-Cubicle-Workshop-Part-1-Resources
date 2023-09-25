const uniqid = require('uniqid');

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

exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};

exports.getAll = () => {
  return [...cubes]; // this will return a copy of cubes. You can use also slice()
};
