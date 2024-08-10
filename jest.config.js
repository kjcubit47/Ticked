const config = {
    preset: 'jest-expo',
    verbose: true,
    roots: [
        "<rootDir>"
    ],
    modulePaths: [
        "./src",
    ],
    moduleNameMapper: {
        "Redux/Store": "<rootDir>/src/Redux/Store",
        "Redux/Reducers": '<rootDir>/src/Redux/Reducers',
        "Redux/Actions/ActionTypes": '<rootDir>/src/Redux/Actions/ActionTypes'
    },
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|react-redux|@redux-devtools|redux-devtools-expo-dev-plugin|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"

    ],
    //      transform: {
    //         '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',

    //     },
    transform: {
        "^.+\\.ts?$": "ts-jest",
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
}

module.exports = config