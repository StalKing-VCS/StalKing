import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Profile from '../screens/Profile';
import Portfolio from '../screens/Portfolio';
import Icon from "react-native-vector-icons/AntDesign";

const BottomTabNavigator = createMaterialBottomTabNavigator({
        Portfolio: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="wallet" size={25} color={tintColor}/>
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="profile" size={25} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Portfolio',
        tabBarOptions: {
            activeTintColor: '#eb6e3d'
        },
        activeColor: '#F44336',
    });

export default BottomTabNavigator;