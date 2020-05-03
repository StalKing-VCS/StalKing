import React from 'react';
import SearchStocks from "../components/SearchStocks";
import StockView from "./StockView";
import {createStackNavigator} from "react-navigation-stack";

const StackNav = createStackNavigator({
    First: {
        screen: SearchStocks,
        navigationOptions: {
            headerTitle: 'Search',
            headerShown:false
        }
    },
    Second: {
        screen: StockView,
        navigationOptions: {
            headerTitle: 'Details',
            headerShown:true
        }
    },
},{
    initialRouteName: 'First'
});

export default StackNav;

