import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import Login from './Login';
import Saved from './Saved'
import Sources from './Sources'
import LoggedIn from '../components/LoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.container}>
      <View style={styles.top}>
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
      <TouchableOpacity onPress={() => { navigation.navigate('Saved') }} style={styles.menuButton}>
        <Text style={styles.menuText}>Search</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Saved') }} style={styles.menuButton}>
        <Text style={styles.menuText}>Saved articles</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Sources') }} style={styles.menuButton}>
        <Text style={styles.menuText}>News sources</Text>
        <Icon name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Sources') }} style={styles.menuButton}>
        <Text style={styles.menuText}>Settings</Text>
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31373e'
  },
  top: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10
  },
  menuButton: {
    width: '101%',
    backgroundColor: '#31373e',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 0,
    flexDirection: 'row'
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'salmon'
  }
})