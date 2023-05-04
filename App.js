import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Latest from './src/screens/Latest';
import Profile from './src/screens/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Latest') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#31373e'}
        
      })}>
        <Tab.Screen name="Home" component={Home} options={{headerStyle: {backgroundColor: '#31373e'}, headerTintColor: '#fff', headerTitleStyle: {fontFamily: 'monospace'}}}/>
        <Tab.Screen name="Latest" component={Latest} options={{headerStyle: {backgroundColor: '#31373e'}, headerTintColor: '#fff', headerTitleStyle: {fontFamily: 'monospace'}}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerStyle: {backgroundColor: '#31373e'}, headerTintColor: '#fff', headerTitleStyle: {fontFamily: 'monospace'}}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053096',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
