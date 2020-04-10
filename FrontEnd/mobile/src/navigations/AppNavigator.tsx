import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import { HomeNavigator } from './HomeNavigator'
import { NavigationContainer } from '@react-navigation/native'
import PostDetailScreen from '../screens/PostDetailScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import { AuthNavigator } from './AuthNavigator'
import { View, Image } from 'react-native'
import { images } from '../assets'

export type RootStackParams = {
  AuthStack: undefined
  HomeStack: undefined
  PostDetail: undefined
  CreatePost: undefined
  EditProfile: undefined
}

const RootStack = createStackNavigator<RootStackParams>()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name={'AuthStack'}
          component={AuthNavigator}
          options={{ header: () => null }}
        />
        <RootStack.Screen
          name={'HomeStack'}
          component={HomeNavigator}
          options={{
            headerTitle: () => (
              <Image
                source={images.APP_ICON}
                style={{ width: 35, height: 35 }}
              />
            ),
            headerLeft: () => null,
          }}
        />
        <RootStack.Screen name={'PostDetail'} component={PostDetailScreen} />
        <RootStack.Screen name={'CreatePost'} component={CreatePostScreen} />
        <RootStack.Screen name={'EditProfile'} component={EditProfileScreen} />
      </RootStack.Navigator>
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
