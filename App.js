import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Ionicons from '@expo/vector-icons/Ionicons';
import Latest from './src/screens/Latest';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Latest') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu-sharp' : 'menu-sharp';
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
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="Latest" component={Latest}/>
        <Tab.Screen name="More" component={Profile} options={{headerTitle: () => <Image style={{width: 80, height: 50, marginLeft: 5, marginTop: 5}} source={require('./assets/News.png')}/>, headerLeft: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
