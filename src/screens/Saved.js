import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { auth, database } from "../components/firebaseConfig";
import { ref, onValue } from '@firebase/database';
import { article } from "../components/styles";
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment/moment";
import { createStackNavigator } from "@react-navigation/stack";
import Article from "./Article";

export function SavedScreen({ navigation }) {
    const [saved, setSaved] = useState([]);
    const currentUser = auth.currentUser;

    if (currentUser) {
        useEffect(() => {
            const savedRef = ref(database, `users/${currentUser.uid}/read`);
            const getData = onValue(savedRef, (snapshot) => {
                const savedData = snapshot.val() || [];
                const savedList = Object.keys(savedData).map((key) => ({
                    id: key,
                    ...savedData[key],
                }));
                setSaved(savedList);
            });
            return () => {
                getData();
            };
        }, [])
    }

    const renderArticle = ({ item }) => (
        <TouchableOpacity activeOpacity={1} style={article.box} onPress={() => navigation.navigate('Article', { article: item })}>
            <Image
                source={{
                    uri: item.urlToImage,
                    cache: 'force-cache',
                }}
                resizeMode={'cover'}
                style={article.image}
            />
            <LinearGradient
                colors={['#0000', '#0000', '#000A', '#000A', 'black']}
                style={article.titleContainer}>
                <Text style={article.text}>{item.title}</Text>
                <Text style={article.timestamp}>
                    {moment(item.publishedAt).format('HH:MM DD, MMMM')}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const listHeader = () => {
        return (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'salmon', marginBottom: 5 }}>Saved articles</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {currentUser ? (
                <FlatList
                    data={saved}
                    renderItem={renderArticle}
                    ListHeaderComponent={listHeader}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles.emptyList}>
                            You haven't saved any articles yet. Press the bookmark icon on any article to save it here.
                        </Text>
                    }
                    style={styles.list}
                />)
                :
                (<Text style={styles.emptyList}>You need to login to save articles!</Text>)}
        </View>
    );
}

const Stack = createStackNavigator();

export default function Saved() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#31373e' },
                headerTintColor: 'salmon', headerTitleStyle: { fontFamily: 'monospace' },
                headerLeft: () => <Image style={{ width: 60, height: 40, marginLeft: 5, marginTop: 5 }} source={require('../../assets/News.png')} />
            }}>
            <Stack.Screen name="SavedScreen" component={SavedScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Article" component={Article} options={{ headerTitle: '' }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#31373e'
    },
    emptyList: {
        marginVertical: 100,
        textAlign: 'center',
        fontSize: 16,
        color: '#d4d2cd',
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
        padding: 3,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 15,
    },
})