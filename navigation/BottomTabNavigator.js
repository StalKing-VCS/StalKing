import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Profile from '../screens/Profile';
import Portfolio from '../screens/Portfolio';
import Search from "../screens/Search";
import Icon from "react-native-vector-icons/FontAwesome5";

const BottomTabNavigator = createMaterialBottomTabNavigator({
        Portfolio: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="wallet" size={25} color={tintColor}/>
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="search" size={25} color={tintColor}/>
                )
            },

        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name="user" size={25} color={tintColor}/>
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
        shifting: true,
        barStyle: { backgroundColor: '#fff' }
    });

export default BottomTabNavigator;