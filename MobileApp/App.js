import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';
import theme from './theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
