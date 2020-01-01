
import NewFeed from "../screens/NewFeed";
import Notification from "../screens/Notification";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { Icon } from "native-base";
import React from "react";
import { createAppContainer } from "react-navigation";

const MainNavigator = createBottomTabNavigator({
    NewFeed: {
        screen: NewFeed,
        navigationOptions: {
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                return <Icon name="home" type="FontAwesome" style={{ color: tintColor }} />
            }
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                return <Icon name="bell" type="FontAwesome" style={{ color: tintColor }} />
            },
        }
    }
}, {
    initialRouteName: "NewFeed"
})

export default createAppContainer(MainNavigator)