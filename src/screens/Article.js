import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import { getDatabase, ref, push } from "firebase/database";

export default function Article({ route, navigation }) {

    const { title, publishedAt, urlToImage, content, url } = route.params.article;

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            console.log('user', JSON.stringify(user));
            setUser(user);
        });
        return subscriber;
    }, []);

    const addSavedToDb = () => {
        const currentUser = auth.currentUser;
        const db = getDatabase();
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: urlToImage }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{moment(publishedAt).format('HH:MM DD.MM.YYYY')}</Text>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.content}>Read rest of the article here {url}</Text>
            <TouchableOpacity style={} onPress={() => addSavedToDb()}>
                <Ionicons name="star-outline" size={24} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#212838',
    },
    image: {
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    date: {
        fontSize: 16,
        marginBottom: 20,
        color: '#ccc',
    },
    content: {
        fontSize: 18,
        color: '#fff',
    },
});

