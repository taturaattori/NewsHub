import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { auth, database } from "../components/firebaseConfig";
import { ref, onValue } from '@firebase/database';
import { article } from "../components/style";
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment/moment";

export default function Saved() {
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
    }, [])}

    const renderArticle = ({ item }) => (
        <TouchableOpacity activeOpacity={1} style={article.box} >
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
        return(
        <View style={{ alignItems: 'center', marginBottom: 15}}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'salmon', marginBottom: 5 }}>Saved articles</Text>
        </View>
    )}

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
                            You haven't saved any articles yet. Press the bookmark icon any article to save it here.
                        </Text>
                    }
                    style={styles.list}
                />)
                :
                (<Text>You have to be logged in to save articles!</Text>)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#31373e'
    },
    emptyList: {
        marginVertical: 50,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
        padding: 7,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 15,
    },
})