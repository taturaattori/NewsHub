import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./Signup";
import { Button } from "react-native-paper";

const Stack = createStackNavigator();

export function LoginStack({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (res && res.user)
      navigation.navigate("UserStack");
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Invalid password or email address');
      } else {
        setError('Problem logging in');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Button mode='contained' buttonColor='salmon' style={styles.button} onPress={loginUser} disabled={!email || !password}>Login</Button>
        <Button mode='contained' buttonColor='salmon' onPress={() => navigation.navigate('Signup')}>New here? Create an account</Button>
      </View>
    </View>
  );
}

export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginStack} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31373e'
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'salmon'
  },
  input: {
    borderWidth: 1,
    borderColor: 'salmon',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: 'white'
  },
  error: {
    marginBottom: 20,
    color: 'white',
  },
  button: {
    marginVertical: 10
  }
});