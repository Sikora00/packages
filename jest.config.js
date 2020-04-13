module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "<rootDir>/coverage/",
};
