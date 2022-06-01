import * as React from 'react';
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './redux/Items'

//components
import Home from './components/Home'
import AllItems from './components/AllItems'

const store = configureStore({
  reducer: {
    items: itemsReducer
  }
})
export default function App() {

  const Stack = createNativeStackNavigator()
  return (
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Food List" options={{
            headerTitleAlign: 'center'
          }} component={Home} />
          <Stack.Screen name="Food List JSON" options={{headerTitle: 'Food List', headerTitleAlign: 'center'}} component={AllItems} />
        </Stack.Navigator> 
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
