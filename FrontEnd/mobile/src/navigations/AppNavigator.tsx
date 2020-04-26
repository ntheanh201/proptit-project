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
import { images } from '../assets'
import { store, AppState, SignInState } from '../core'
import { connect } from 'react-redux'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import GroupScreen from '../screens/GroupScreen'
import { Text, View, Image, SafeAreaView } from 'react-native'
import styles from '../values/styles'
import ImageViewScreen from '../screens/ImageViewScreen'

export type SubNavigator<T extends ParamListBase, K extends keyof T> = {
  screen: K
  params?: T[K]
}

export type RootStackParams = {
  SignIn: undefined
  HomeStack: undefined
  PostDetail: { postId: number }
  CreatePost: { postId: number }
  EditProfile: undefined
  Group: undefined
  ImageView: { listImage: string[] }
}

const RootStack = createStackNavigator<RootStackParams>()

const AppNavigator = ({ signInState }: { signInState: SignInState }) => {
  if (signInState.isOpeningApp) {
    return <SplashScreen />
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {signInState.isSignIn ? (
          <RootStack.Screen
            name={'HomeStack'}
            component={HomeNavigator}
            options={{
              header: () => null,
            }}
          />
        ) : (
          <RootStack.Screen
            name={'SignIn'}
            component={SignInScreen}
            options={{ header: () => null }}
          />
        )}
        <RootStack.Screen name={'PostDetail'} component={PostDetailScreen} />
        <RootStack.Screen name={'CreatePost'} component={CreatePostScreen} />
        <RootStack.Screen name={'EditProfile'} component={EditProfileScreen} />
        <RootStack.Screen
          name={'ImageView'}
          component={ImageViewScreen}
          // options={{ header: () => null }}
        />
        <RootStack.Screen name={'Group'} component={GroupScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
