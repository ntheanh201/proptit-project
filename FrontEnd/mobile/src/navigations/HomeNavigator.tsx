import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import NewsFeedScreen from '../screens/NewsFeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import PostDetailScreen from '../screens/PostDetailScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import NotificationScreen from '../screens/NotificationScreen'
import { SubNavigator, RootStackParams } from './AppNavigator'
import MenuScreen from '../screens/MenuScreen'
import GroupScreen from '../screens/GroupScreen'
import { NavigationProp } from '@react-navigation/native'
import { View, Text, Image } from 'react-native'
import styles from '../values/styles'
import ImageViewScreen from '../screens/ImageViewScreen'
import RankingScreen from '../screens/RankingScreen'

export type HomeTabParams = {
  Newsfeed: undefined
  Notification: undefined
}

const Tab = createMaterialBottomTabNavigator()

export const HomeNavigator = () => {
  return (
    <Tab.Navigator
      shifting={true}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color }) => {
          let iconName
          switch (route.name) {
            case 'Newsfeed':
              iconName = 'ios-home'
              break
            case 'Ranking':
              iconName = 'stats-chart'
              break
            case 'Notification':
              iconName = 'ios-notifications'
              break
            case 'Menu':
              iconName = 'ios-menu'
              break
            default:
              iconName = 'ios-home'
              break
          }
          return <Icon name={iconName} style={{ color, fontSize: 27 }} />
        },
      })}>
      <Tab.Screen
        name={'Newsfeed'}
        component={NewsFeedScreen}
        options={{ tabBarColor: '#2962ff' }}
      />
      <Tab.Screen
        name={'Ranking'}
        component={RankingScreen}
        options={{ tabBarColor: '#2a9d8f' }}
      />
      <Tab.Screen
        name={'Notification'}
        component={NotificationScreen}
        options={{ tabBarColor: '#e9c46a' }}
      />
      <Tab.Screen
        name={'Menu'}
        component={MenuScreen}
        options={{ tabBarColor: '#f4a261' }}
      />
    </Tab.Navigator>
  )
}
