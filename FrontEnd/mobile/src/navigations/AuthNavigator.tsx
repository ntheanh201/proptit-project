import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import SignInScreen from '../screens/SignInScreen'

export type AuthStackParams = {
  Splash: undefined
  SignIn: undefined
}

const AuthStack = createStackNavigator<AuthStackParams>()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  )
}
