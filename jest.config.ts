const jestConfig = {
    clearMocks: true,
    coverageProvider: "v8",
    preset: "ts-jest/presets/js-with-ts",
    setupFiles: ["dotenv/config"],
    moduleNameMapper: {
        "~/(.*)": ["<rootDir>/src/$1"]
    },
    transform: {
        "^.+\\.mjs$": "ts-jest",
    },
}

export default jestConfig