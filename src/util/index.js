import { Dimensions, Platform } from "react-native";

export function isAndroid() {
    return (Platform.OS === 'android')
}
export var ScreenDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}
