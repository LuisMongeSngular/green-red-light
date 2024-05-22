module.exports = {
    testEnvironment: 'jest-environment-jsdom-global',
    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.mjs$': 'babel-jest',
        '^.+\\.css$': 'jest-css-modules-transform',
    },
    transformIgnorePatterns: [],
    testMatch: ['<rootDir>/src/**/*.test.js'],
};
