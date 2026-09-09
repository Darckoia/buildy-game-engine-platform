module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps', '<rootDir>/packages', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@buildy/(.*)$': '<rootDir>/packages/$1/src'
  },
  collectCoverageFrom: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}', '!**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
