import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";
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
        <>
          <Text>Hello {user.displayName}!</Text>
          <Text>{user.email}</Text>
        </>
      ) : (
        <Text></Text>
      )}
      <Button title="Log out" onPress={logout} />
    </View>
  );
}