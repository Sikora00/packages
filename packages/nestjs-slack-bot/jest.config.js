const pack = require('./package');

module.exports = {
  displayName: pack.name,
  name: pack.name,
  testPathIgnorePatterns: ['files/'],
  preset: '../../jest.config.js',
};
