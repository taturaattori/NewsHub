import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Text, TouchableOpacity } from 'react-native';
import Login from '../components/Login';
import Saved from './Saved'
import Sources from './Sources'
import LoggedIn from '../components/LoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";
import { Button } from 'react-native-paper';

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
      <TouchableOpacity>
        <Text>Saved articles</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>News sources</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserStack" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginStack" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Saved" component={Saved}/>
      <Stack.Screen name="Sources" component={Sources}/>
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
  }
})