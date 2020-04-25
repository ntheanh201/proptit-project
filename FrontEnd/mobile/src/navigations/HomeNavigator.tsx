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

export type HomeTabParams = {
  Newsfeed: undefined
  Notification: undefined
  Profile: undefined
  CreatePost: SubNavigator<RootStackParams>
  PostDetail: SubNavigator<RootStackParams>
  ImageView: SubNavigator<RootStackParams>
}

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

interface TabBarIconProps {
  focused: boolean
  color: string
  size: number
}

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
            case 'Notification':
              iconName = 'ios-notifications'
              break
            case 'Profile':
              iconName = 'ios-contact'
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
        options={{ tabBarColor: '#6200ee' }}
      />
      <Tab.Screen
        name={'Notification'}
        component={NotificationScreen}
        options={{ tabBarColor: '#2962ff' }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{ tabBarColor: '#00796b' }}
      />
      <Tab.Screen
        name={'Menu'}
        component={MenuScreen}
        options={{ tabBarColor: '#00796b' }}
      />
    </Tab.Navigator>
  )
}

const NewsFeedStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'Home'} component={NewsFeedScreen} />
      <Stack.Screen name={'Detail'} component={PostDetailScreen} />
      <Stack.Screen name={'CreatePost'} component={CreatePostScreen} />
    </Stack.Navigator>
  )
}

const NotiStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'Notification'} component={NotificationScreen} />
      <Stack.Screen name={'Detail'} component={PostDetailScreen} />
    </Stack.Navigator>
  )
}
