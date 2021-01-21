import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HelloWorldApp from './Hello';
import HomeScreen from './HomeScreen';
import ResultsScreen from './ResultsScreen';
import {createStackNavigator} from '@react-navigation/stack';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         onPress={() => navigation.navigate('About us')}
//         title="Go to About us"
//       />
//     </View>
//   );
// }

function NotificationsScreen({navigation}) {
  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <HelloWorldApp />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Result" component={ResultsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DrawerHome">
        <Drawer.Screen name="DrawerHome" component={StackScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
