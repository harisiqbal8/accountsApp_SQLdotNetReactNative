/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './Pages/BottomNavigation';
import MasterACCount from './Pages/MasterACCount';
import ChartFAC from './Pages/ChartFAC';
import GeneralJournal from './Pages/GeneralJournal';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="BottomBar" component={BottomNavigation} />
        <Stack.Screen options={{ headerTitleAlign: 'center',title:"Master Account" }} name="MasterACCount" component={MasterACCount} />
        <Stack.Screen options={{ headerTitleAlign: 'center',title:"Chart of Account" }} name="ChartFAC" component={ChartFAC} />
        <Stack.Screen options={{ headerTitleAlign: 'center',title:"General Journal" }} name="GeneralJournal" component={GeneralJournal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
