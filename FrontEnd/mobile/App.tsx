import { View, Text } from 'react-native';
import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import { store } from './src/core';
import { Provider } from 'react-redux';
import NewsFeedScreen from './src/screens/NewsFeedScreen';

const App = () => {
  return (
    // <Provider store={store}>
    //   <AppNavigator />
    // </Provider>
    <NewsFeedScreen />
  );
};

export default App;
