import { createDrawerNavigator } from 'react-navigation-drawer'
import React from 'react'
import { MenuHomeSideBar } from '../components'
import { createAppContainer } from 'react-navigation';
import Setting from '../screens/Setting' 
import MainNavigator from './MainNavigator';

const HomeNavigator = createDrawerNavigator (
    {
       Main: MainNavigator,
       Setting: Setting,
    },
    {
        initialRouteName: "Main",
        contentComponent: MenuHomeSideBar
    }
);

export default createAppContainer(HomeNavigator);