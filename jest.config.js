module.exports = {
  moduleFileExtensions: ["js", "json", "jsx"],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  testEnvironment: 'node',
  testMatch: ['**/**/?(*.)(test).js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
