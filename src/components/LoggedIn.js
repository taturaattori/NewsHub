import { signOut } from "firebase/auth";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

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
          <Text style={styles.username}>{user.displayName}</Text>
          <Button title="Log out" onPress={logout} />
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
    flexDirection: 'row'
  }
})