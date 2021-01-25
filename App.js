import * as React from 'react';
import {} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screen/HomeScreen';
import ResultsScreen from './screen/ResultsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Result" component={ResultsScreen} />
  </Stack.Navigator>
);

export default function App() {
  LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DrawerHome">
        <Drawer.Screen name="DrawerHome" component={StackScreens} />
        {/* // here u can add new left drawer */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
