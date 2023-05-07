import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./Signup";
import { Button } from "react-native-paper";
import { userInput } from "../components/styles";

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
    <View style={userInput.outer}>
      <View style={userInput.inner}>
        <Text style={userInput.header}>Login</Text>

        {error && <Text style={userInput.error}>{error}</Text>}

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={userInput.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={userInput.input}
        />
        <Button mode='contained' buttonColor='salmon' style={userInput.button} onPress={loginUser} disabled={!email || !password}>Login</Button>
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
