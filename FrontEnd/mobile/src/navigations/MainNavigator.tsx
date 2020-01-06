
import NewFeed from "../screens/NewFeed";
import Notification from "../screens/Notification";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { Icon } from "native-base";
import React from "react";
import { createAppContainer } from "react-navigation";
import { TouchableHighlight } from "react-native-gesture-handler";

const MainNavigator = createBottomTabNavigator({
    NewFeed: {
        screen: NewFeed,
        navigationOptions: {
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                return <Icon name="home" type="AntDesign" style={{ color: tintColor }} />
            }
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                return (
                    <Icon name="notification" type="AntDesign" style={{ color: tintColor }} />

                )
            },
        }
    },
    Search: {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                return <Icon name="search1" type="AntDesign" style={{ color: tintColor }} />
            },
        }
    }
}, {
    initialRouteName: "NewFeed",
    tabBarOptions: {
        showLabel: false,
    }
})

export default createAppContainer(MainNavigator)