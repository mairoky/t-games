import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/components/Auth/SignIn';
import SignUp from './src/components/Auth/SignUp';
import GameList from './src/components/Games/GameList';
import GameDetail from './src/components/Games/GameDetail';
import AuthProvider from './src/contexts/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="GameList" component={GameList} />
          <Stack.Screen name="GameDetail" component={GameDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
