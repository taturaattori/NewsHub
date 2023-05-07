import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { auth } from "../components/firebaseConfig";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { userInput } from "../components/styles";
import { Button, Snackbar } from "react-native-paper";

export default function ChangePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handlePasswordChange = async () => {
        try {
            if (newPassword === confirmNewPassword) {
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                console.log('Password changed successfully');
                setSnackbarVisible(true);
                //navigation.navigate("SettingsScreen");
            } else {
                setError("New passwords don't match.")
            }
        } catch (e) {
            if (e.code === 'auth/wrong-password') {
                setError("Invalid current password");
            } else if (e.code === 'auth/weak-password') {
                setError("New password must be at least 6 characters.");
            }
            console.log(e);
        }
    }

    return (
        <View style={userInput.outer}>
            <View style={userInput.inner}>
                <Text style={userInput.header}>Change password</Text>

                {error && <Text style={userInput.error}>{error}</Text>}

                <TextInput
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    placeholder="Current password"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    style={userInput.input}
                />
                <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder="New password"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    style={userInput.input}
                />
                <TextInput
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry
                    placeholder="Confirm new password"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    style={userInput.input}
                />

                <Button
                    mode='contained' buttonColor='salmon' style={userInput.button}
                    onPress={handlePasswordChange}
                    disabled={!currentPassword || !newPassword}
                >Change Password</Button>
            </View>
            <Snackbar
                    visible={snackbarVisible}
                    theme={{ colors: { surface: 'gray', accent: 'red' }, }}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={4000}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {
                            setSnackbarVisible(false);
                        },
                    }}

                >Successfully changed password!</Snackbar>
        </View>
    );
}