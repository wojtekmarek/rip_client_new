import '@testing-library/jest-dom';

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageReporters: ["text-summary", "html"],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',

}