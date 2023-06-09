import React, { useState, useEffect } from 'react';
import { View, menuheet, Switch, Text, TouchableOpacity } from 'react-native';
import Login from './Login';
import Saved from './Saved'
import Sources from './Sources'
import Search from './Search';
import LoggedIn from '../components/LoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { menu } from '../components/styles';
import Settings from './Settings';

const Stack = createStackNavigator();

export function ProfileScreen({ navigation }) {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("user", JSON.stringify(user));
      if (user) { setLoggedIn(true) } else { setLoggedIn(false) }
    });
    return subscriber;
  }, []);

  return (
    <View style={menu.container}>
      <View style={menu.top}>
        {loggedIn ? (
          <>
            <LoggedIn />
          </>
        ) : (
          <>
            <Button mode='contained' buttonColor='salmon' onPress={() => navigation.navigate('LoginStack')}>Login</Button>
          </>
        )}
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate('Search') }} style={menu.menuButton}>
        <Text style={menu.menuText}>Search</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Saved') }} style={menu.menuButton}>
        <Text style={menu.menuText}>Saved articles</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Sources') }} style={menu.menuButton}>
        <Text style={menu.menuText}>News sources</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Settings') }} style={menu.menuButton}>
        <Text style={menu.menuText}>Settings</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserStack" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginStack" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Saved" component={Saved} options={{ headerShown: false }}/>
      <Stack.Screen name="Sources" component={Sources} options={{ headerShown: false }}/>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
