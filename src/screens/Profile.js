import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Switch, Text } from 'react-native';
import Login from '../components/Login';
import LoggedIn from '../components/LoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";

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
      {loggedIn ? (
        <>
          <LoggedIn />
        </>
      ) : (
        <>
          <Button onPress={() => navigation.navigate('LoginStack')} title="Login" />
        </>
      )}
    </View>
  );
}

export default function Profile() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="UserStack" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginStack" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })