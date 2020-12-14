import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AppTabNavigator} from './Components/AppTabNavigator';
import CustomMenu from './CustomMenu';
export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},

},{
    contentComponent:CustomMenu
},{
    initialRouteName:'Home'
})
