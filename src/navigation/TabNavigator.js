import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import CardDetails from '../CardDetails';
import GameScreen from '../screens/GameScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="YoloPay"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'YoloPay') {
            iconName = 'payment';
          } else if (route.name === 'Ginie') {
            iconName = 'sports-esports';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff4444',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333333',
          borderTopWidth: 1,
          paddingVertical: 8,
          height: 70,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'home',
        }}
      />
      <Tab.Screen 
        name="YoloPay" 
        component={CardDetails}
        options={{
          tabBarLabel: 'yolo pay',
        }}
      />
      <Tab.Screen 
        name="Ginie" 
        component={GameScreen}
        options={{
          tabBarLabel: 'ginie',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;