import React from 'react';
import { View, StyleSheet } from 'react-native';

import ScreenName from '../components/ScreenName.js'

export default class Search extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ScreenName name={'Search'} />
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