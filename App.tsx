/**
 * YOLO Payment App
 * React Native CLI App with Bottom Tab Navigation
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
