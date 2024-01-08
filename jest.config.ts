module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  setupFiles: ['jest-localstorage-mock'],
};

export {};
