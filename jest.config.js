/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/server/app.ts',
    'src/server/index.ts',
    'src/routers/users.route.ts',
    'src/repo/repo.users/users.mongo.model.ts',
  ],
};
