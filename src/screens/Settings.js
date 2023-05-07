import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { menu } from "../components/styles";
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "../components/firebaseConfig";
import { deleteUser } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import ChangePassword from "./ChangePassword";


export function SettingsScreen({ navigation }) {
    const currentUser = auth.currentUser

    const handleDeleteUser = () => {
        Alert.alert(`Delete user: ${currentUser.displayName}`, 'Are you sure you want to permanently delete this account ?', [
            {
                text: 'No', style: 'cancel'
            },
            {
                text: 'Yes', onPress: () => deleteUser(currentUser).then(() => {
                    }).catch((error) => {
                        console.log(error);
                    })
            },
        ])
    }

    return (
        <View style={menu.container}>
            <Ionicons name="settings-outline" size={120} color={'#ccc'} style={menu.icon}/>
            <TouchableOpacity style={menu.menuButton} onPress={() => Linking.openSettings()}>
                <Text style={menu.menuText}>System settings</Text>
                <Icon name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={menu.menuButton} onPress={() => { navigation.navigate('ChangePassword') }}>
                <Text style={menu.menuText}>Change password</Text>
                <Icon name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={menu.menuButton} onPress={handleDeleteUser}>
                <Text style={menu.menuText}>Delete account</Text>
                <Icon name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const Stack = createStackNavigator();

export default function Settings() {

    return(
        <Stack.Navigator>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}