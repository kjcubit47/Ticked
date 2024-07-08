import { Colors } from "react-native/Libraries/NewAppScreen"
import { ScreenDimensions } from "util"

export const COLORS = {
    primary: '#6b7999',
    // primary: '#037d50', // MOSS Green
    secondary: '#9997ba', // Darker Green
    // secondary: '#006400', // Darker Green
    tertiary: '#b7d1e2', // ICON Green
    // tertiary: '#44c778', // ICON Green
    test: "#049660", // Modal and Tab Bar Green
    black: "#000",
    white: "#fff",
    medium: "#6e6969",
    light: "#d8dee4",
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
        width: '100%',
        height: '10%',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'static',
        Text: {
            fontSize: 24,
            fontWeight: '500',
            textAlign: "center"
        }

    },
    TextInput: {
        padding: 10,
        fontSize: 20,
        width: ScreenDimensions.width * 0.7,
        backgroundColor: COLORS.secondary
        // marginHorizontal: 100
    }
}
