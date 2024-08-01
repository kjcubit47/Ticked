import { Dimensions, Platform } from "react-native";

export function isAndroid() {
    return (Platform.OS === 'android')
}
export let ScreenDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export let genericLists = []

for (let i = 0; i < 10; i++) {
    genericLists.push({
        title: "LIST" + i,
        id: i,

    })
}

export let genericSublists = []
for (let i = 0; i < 10; i++) {
    genericSublists.push([{
        title: "SUBLISTITEM1",
        id: 0,
        parentId: i,
        complete: false,
        important: false,
    },
    {
        title: "SUBLISTITEM2",
        id: 1,
        parentId: i,
        complete: false,
        important: false,
    }])
}