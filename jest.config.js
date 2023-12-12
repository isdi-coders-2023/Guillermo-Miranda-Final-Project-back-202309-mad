/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/server/app.ts',
    'src/server/index.ts',
    'src/entities/*.ts',
    'src/types/*.ts',
    'src/repos/repo.users/users.mongo.model.ts',
    'src/repos/repo.recipes/recipes.mongo.model.ts',
    'src/routers/users.router.ts',
    'src/routers/recipes.router.ts'
  ],
};
