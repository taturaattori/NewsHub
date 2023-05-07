import { signOut } from "firebase/auth";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "react-native-paper";

export default function LoggedIn() {

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };
  const user = auth.currentUser;

  return (
    <View>
      {user ? (
        <View style={styles.profile}>
          <View style={styles.left}>
          <Icon name="person-circle-outline" size={35} color="white" style={styles.icon}/>
          <Text style={styles.username}>{user.displayName}</Text>
          </View>
          <Button mode='contained' buttonColor='salmon' onPress={logout}>Log out</Button>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 24,
    color: 'white',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10
  },
  icon: {
    marginRight: 10,
  },
  left: {
    flexDirection: 'row',
    marginRight: 130
  }
})