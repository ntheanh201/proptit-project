import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import { HomeNavigator } from './HomeNavigator'
import { NavigationContainer } from '@react-navigation/native'
import PostDetailScreen from '../screens/PostDetailScreen'
import CreatePostScreen from '../screens/CreatePostScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'SignIn'} component={SignInScreen} />
        <Stack.Screen name={'HomeStack'} component={HomeNavigator} />
        <Stack.Screen name={'Detail'} component={PostDetailScreen} />
        <Stack.Screen name={'CreatePost'} component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// const AppNavigator = createSwitchNavigator(
//   {
//     SplashStack: {
//       screen: SplashScreen,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     AuthStack: createStackNavigator({
//       SignIn: {
//         screen: SignInScreen,
//         navigationOptions: {
//           header: null,
//         },
//       },
//     }),
//     HomeStack: {
//       screen: HomeNavigator,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   },
//   {
//     initialRouteName: 'SplashStack',
//   },
// )

export default AppNavigator
