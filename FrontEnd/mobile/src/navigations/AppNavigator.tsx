import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'
import { HomeNavigator } from './HomeNavigator'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import PostDetailScreen from '../screens/PostDetailScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import { AuthNavigator } from './AuthNavigator'
import { View, Image } from 'react-native'
import { images } from '../assets'

export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K] }
}[keyof T]

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
            header: () => null,
          }}
        />
        <RootStack.Screen name={'PostDetail'} component={PostDetailScreen} />
        <RootStack.Screen name={'CreatePost'} component={CreatePostScreen} />
        <RootStack.Screen name={'EditProfile'} component={EditProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
