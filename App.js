import { StyleSheet, Text, View, Image } from 'react-native';
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
        tabBarActiveTintColor: 'salmon',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#31373e'},
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#31373e'},
        headerTintColor: 'salmon', headerTitleStyle: {fontFamily: 'monospace'},
        headerLeft: () => <Image style={{width: 60, height: 40, marginLeft: 5, marginTop: 5}} source={require('./assets/News.png')}/>
      })}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Latest" component={Latest}/>
        <Tab.Screen name="Profile" component={Profile}/>
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
