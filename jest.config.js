module.exports = {
  preset: "@react-native/jest-preset",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  setupFilesAfterEnv: []
};
