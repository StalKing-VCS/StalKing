import React from 'react';
import { View, StyleSheet } from 'react-native';

// pull in the ScreenName component from ScreenName.js
import ScreenName from '../components/ScreenName.js'
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
    <Ionicons
        name={'md-home'}
        size={35}
        color={props.focused ? 'grey' : 'darkgrey'}
    />
)

export default class Portfolio extends React.Component {

    static navigationOptions = {
        tabBarIcon: TabIcon
    };

    render() {
        return (
            <View style={styles.container}>
                <ScreenName name={'Portfolio'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});