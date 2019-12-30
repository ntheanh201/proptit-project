import { createDrawerNavigator } from 'react-navigation-drawer'
import React from 'react'
import { MenuHomeSideBar } from '../components'
import { createAppContainer } from 'react-navigation';
import NewFeeds from '../screens/NewFeed'
import MainNavigator from './MainNavigator';

const HomeNavigator = createDrawerNavigator (
    {
       Main: MainNavigator
    },
    {
        initialRouteName: "Main",
        contentComponent: MenuHomeSideBar
    }
);

export default createAppContainer(HomeNavigator);