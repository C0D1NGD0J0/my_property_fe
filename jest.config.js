const nextJest = require('next/jest.js');
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/__tests__/shared/'],
  moduleNameMapper: {
    '@services/(.*)': ['<rootDir>/src/services/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@components/(.*)': ['<rootDir>/src/components/$1'],
    '@test/(.*)': ['<rootDir>/__tests__/$1'],
    '@app/(.*)': ['<rootDir>/src/app/$1'],
    '@configs/(.*)': ['<rootDir>/src/configs/$1'],
    '@hooks/(.*)': ['<rootDir>/src/hooks/$1'],
    '@contexts/(.*)': ['<rootDir>/src/contexts/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1'],
    '@validations/(.*)': ['<rootDir>/src/validations/$1'],
    '@utils/(.*)': ['<rootDir>/src/utils/$1'],
    '@root/(.*)': ['<rootDir>/$1'],
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);