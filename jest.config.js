const config = {
    // preset: 'react-native',
    preset: 'jest-expo',
    verbose: true,
    roots: [
        "<rootDir>"
    ],
    modulePaths: [
        "./src",
    ],
    setupFiles: [
        "<rootDir>/setup-jest.js"
    ],
    moduleNameMapper: {
        "Redux/Store": "<rootDir>/src/Redux/Store",
        "Redux/Reducers": '<rootDir>/src/Redux/Reducers',
        "Redux/Actions/ActionTypes": '<rootDir>/src/Redux/Actions/ActionTypes'
    },
    transformIgnorePatterns: [
        // "node_modules/(?!((jest-)?react-native|@redux-devtools/.*|react-redux|@redux-devtools|redux-devtools-expo-dev-plugin|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
        "!node_modules/"
    ],
    //      transform: {
    //         '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',

    //     },
    transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        // '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    },
}

module.exports = config