import { Dimensions, Platform } from "react-native";

export function isAndroid() {
    return (Platform.OS === 'android')
}
export let ScreenDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export const sortSublistByDate = (arr) => {
    arr.sort((a, b) => a - b);
}