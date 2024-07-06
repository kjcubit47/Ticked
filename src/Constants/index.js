import { Colors } from "react-native/Libraries/NewAppScreen"
import { ScreenDimensions } from "util"

export const COLORS = {
    primary: '#037d50', // MOSS Green
    secondary: '#006400', // Darker Green
    tertiary: '#44c778', // ICON Green
    test: "#049660", // Modal and Tab Bar Green
    black: "#000",
    white: "#fff",
    medium: "#6e6969",
    light: "#f8f4f4",
    dark: "#0c0c0c",
    danger: "#ff5252",
}

export const STYLES = {
    "Screen": {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    "Text": {
        fontSize: 24,
        textAlign: 'center'
    },
    "Button": {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 20,
    },
    "Header": {
        flexDirection: "row",
        top: 0,
        width: '100%',
        height: '6%',
        backgroundColor: COLORS.primary,

        // justifyContent: 'center',
        Text: {
            fontSize: 24,
            fontWeight: '500',
            textAlign: "center"
        }
    },
}
