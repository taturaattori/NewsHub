import { View, Text, TextInput, Alert } from "react-native";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/firebaseConfig";
import { Button } from "react-native-paper";
import { userInput } from "../components/styles";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        if (res && res.user) {
          Alert.alert("Account created successfully");
          updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            signOut(auth);
            navigation.navigate("UserStack");
          }).catch((e) => {
            console.log(e);
          })
        }
      } else {
        setError("Passwords don't match.");
      }
    } catch (e) {
      if (e.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      }
      if (e.code === 'auth/weak-password') {
        setError("Password must be at least 6 characters.");
      }
      if (e.code === 'auth/email-already-in-use') {
        setError('Email address already in use.');
      }
      console.log(e);
    }
  };

  return (
    <View style={userInput.outer}>
      <View style={userInput.inner}>
        <Text style={userInput.header}>Sign up</Text>

        {error && <Text style={userInput.error}>{error}</Text>}

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={userInput.input}
        />
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
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={userInput.input}
        />

        <Button
          mode='contained' buttonColor='salmon' style={userInput.button}
          onPress={createAccount}
          disabled={!username || !email || !password || !confirmPassword}
        >Create account</Button>
      </View>
    </View>
  );
}
