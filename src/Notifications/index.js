

import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    // if (Device.isDevice) 
    if (process.env.TESTING != 'true') {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        // alert('Must use physical device for Push Notifications');
    }

    return token;
}
export function initNotifications(notificationListener, responseListener, setExpoPushToken, setNotification, setChannels) {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
        Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
    });

    return () => {
        notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
    };
}
// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Second, call the method

// Notifications.scheduleNotificationAsync({
//     content: {
//         title: 'Look at that notification',
//         body: "I'm so proud of myself!",
//     },
//     trigger: null,
// });

export async function schedulePushNotification(title, body, data, trigger) {
    console.log(title, body, data, trigger)

    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data, // Not presented to user
        },
        trigger: trigger,
    });
    return notificationId

}

export async function updateNotification(id, title, body, data, trigger) {
    await Notifications.cancelScheduledNotificationAsync(id)
    const newId = await schedulePushNotification(title, body, data, trigger)
    return newId
}