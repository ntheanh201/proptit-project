import { createDrawerNavigator } from 'react-navigation-drawer'
import React from 'react'
import { MenuHomeSideBar } from '../components'
import { createAppContainer } from 'react-navigation';
import NewFeeds from '../screens/NewFeeds'

const HomeNavigator = createDrawerNavigator(
    {
        NewFeeds: {
            screen: NewFeeds,
            navigationOptions: {
                
            }
        }
    },
    {
        initialRouteName: "NewFeeds",
        contentComponent: props => <MenuHomeSideBar {...props}/>
    }
);

export default createAppContainer(HomeNavigator);