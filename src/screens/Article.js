import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import moment from "moment";
import { useState, useEffect } from "react";
import { auth, database } from "../components/firebaseConfig";
import { ref, push, remove, onValue, child, get } from "@firebase/database";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Snackbar } from "react-native-paper";

export default function Article({ route, navigation }) {

    const { title, publishedAt, urlToImage, content, url } = route.params.article;
    const currentUser = auth.currentUser;
    const [saved, setSaved] = useState(false);
    const [savedArticleKey, setSavedArticleKey] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenUrl = () => {
        Linking.openURL(url);
    }

    const handleSaveArticle = () => {
        const articleRef = ref(database, `users/${currentUser.uid}/read`);
        const articleData = {
            title: title,
            url: url,
            content: content,
            urlToImage: urlToImage,
            publishedAt: publishedAt
        };

        if (saved) {
            remove(ref(database, `users/${currentUser.uid}/read/${savedArticleKey}`)).then(() => {
                setSaved(false);
                setSnackbarMessage('Article removed from saved list');
                setSnackbarVisible(true);

            });
        } else {
            push(articleRef, articleData).then((newRef) => {
                setSaved(true);
                setSavedArticleKey(newRef.key);
                setSnackbarMessage('Article saved');
                setSnackbarVisible(true);
            });
        }
    };

    const getSavedArticles = () => {
        if (currentUser) {
            const articleRef = ref(database, `users/${currentUser.uid}/read`);
            onValue(articleRef, (snapshot) => {
                const savedArticles = snapshot.val();
                if (savedArticles) {
                    const savedArticleKeys = Object.keys(savedArticles);
                    const savedArticle = savedArticleKeys.find((key) => savedArticles[key].title === title);
                    if (savedArticle) {
                        setSaved(true);
                        setSavedArticleKey(savedArticle);
                    }
                }
            });
        }
    };

    useEffect(() => {
        getSavedArticles();
    }, []);

    // implement hide bookmark if not logged in
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Image source={{ uri: urlToImage }} style={styles.image} />
            <Text style={styles.date}>Published: {moment(publishedAt).format('HH:MM DD.MM.YYYY')}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5}}>
            <TouchableOpacity onPress={handleOpenUrl} style={{flexDirection: 'row'}}>
                <Text style={styles.link}>Read the full article</Text>
                <Ionicons name="open-outline" size={25} color='salmon'/>
            </TouchableOpacity>
            { currentUser ? (
            <TouchableOpacity onPress={handleSaveArticle} style={{position:"absolute", right: -175}}>
                <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={30} color="salmon" />
            </TouchableOpacity>) : (
            <></>
            )}
            </View>
            <Snackbar
                visible={snackbarVisible}
                theme={{ colors: {surface: 'gray', accent: 'red'},}}
                onDismiss={() => setSnackbarVisible(false)}
                duration={4000}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        setSnackbarVisible(false);
                    },
                }}
                
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#31373e',
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
        width: "100%"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    date: {
        fontSize: 14,
        marginBottom: 20,
        color: '#ccc',
    },
    content: {
        fontSize: 18,
        lineHeight: 22,
        color: '#fff',
        marginBottom: 20
    },
    link: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'salmon',
        marginBottom: 7,
        marginRight: 5,
        marginLeft: 5,
        textDecorationLine: 'underline'
    }
});

