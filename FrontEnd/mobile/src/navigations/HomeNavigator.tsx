import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import NewsFeedScreen from '../screens/NewsFeedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { Icon } from 'native-base'
import PostDetailScreen from '../screens/PostDetailScreen'
import CreatePostScreen from '../screens/CreatePostScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export const HomeNavigator = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = 'home'
          } else {
            iconName = 'user'
          }
          return <Icon name={iconName} type="AntDesign" style={{ color }} />
        },
      })}>
      <Tab.Screen name={'Home'} component={NewsFeedStack} />
      <Tab.Screen name={'Profile'} component={ProfileScreen} />
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
// const HomeNavigator = createBottomTabNavigator(
//   {
//     NewsFeed: {
//       screen: createStackNavigator({
//         NewFeed: {
//           screen: NewsFeedScreen,
//           navigationOptions: {
//             header: null,
//           },
//         },
//         Detail: {
//           screen: PostDetailScreen,
//           navigationOptions: {
//             header: null,
//           },
//         },
//       }),
//       navigationOptions: {
//         tabBarIcon: ({ focused, horizontal, tintColor }) => {
//           return (
//             <Icon name="home" type="AntDesign" style={{ color: tintColor }} />
//           )
//         },
//       },
//     },
//     Profile: {
//       screen: ProfileScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused, horizontal, tintColor }) => {
//           return (
//             <Icon name="user" type="AntDesign" style={{ color: tintColor }} />
//           )
//         },
//       },
//     },
//   },
//   {
//     initialRouteName: 'NewsFeed',
//     tabBarOptions: {
//       showLabel: false,
//     },
//   },
// )
