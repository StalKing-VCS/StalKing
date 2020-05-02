import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Profile from '../screens/Profile';
import Portfolio from '../screens/Portfolio';

const BottomTabNavigator = createBottomTabNavigator({
    Portfolio: Portfolio,
    Profile: Profile
});

export default BottomTabNavigator;