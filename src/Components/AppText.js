import React from 'react';
import { Text } from 'react-native';
import { STYLES } from 'Constants';

function AppText({ children, style }) {

    return (

        <Text style={[STYLES.Text, style]}>{children}</Text>
    );
}



export default AppText;