
import { useState, useEffect, useRef, React } from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import store, { persistor } from "Redux/Store";
import * as Notifications from 'expo-notifications';
import { initNotifications } from "Notifications";
import MainNavigator from "Components/Navigators/MainNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    initNotifications(notificationListener, responseListener, setExpoPushToken, setNotification, setChannels)
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

