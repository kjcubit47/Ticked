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

export function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');

    // Determine AM or PM
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Converts 0 (midnight) to 12

    // Pad hours with leading zero if needed
    // hours = hours.toString().padStart(2, '0');

    return `${hours}:${minutes} ${period}`;
}