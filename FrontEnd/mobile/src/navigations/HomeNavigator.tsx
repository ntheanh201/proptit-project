import { createDrawerNavigator } from 'react-navigation-drawer'
import React from 'react'
import { MenuHomeSideBar } from '../components'
import { createAppContainer } from 'react-navigation';
import Setting from '../screens/Setting'
import MainNavigator from './MainNavigator';
import CreatePost from '../screens/CreatePost';
import DetailPost from '../screens/DetailPost'

const HomeNavigator = createDrawerNavigator(
    {
        Main: MainNavigator,
        CreatePost: CreatePost,
        Setting: Setting,
        DetailPost: DetailPost
    },
    {
        initialRouteName: "Main",
        contentComponent: MenuHomeSideBar
    }
);

export default createAppContainer(HomeNavigator);