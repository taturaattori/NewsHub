import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from "react-native";
import { NEWS_API_KEY } from "@env"

export default function Sources() {
    const [sources, setSources] = useState([]);

    const fetchSources = () => {
        fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWS_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setSources(data.sources);
            })
            .catch(error => {
                console.error(error)
            });
    }

    useEffect(() => { fetchSources() }, []);

    return(
        <View style={styles.container}>
            <FlatList
            data={sources}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.box}>
                    <Text style={styles.sourceName}>{item.name}</Text>
                    <Text style={styles.sourceText}>{item.description}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.url} >{item.url}</Text>
                    </TouchableOpacity>
                </View>
            )}
            style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#31373e'
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
        paddingHorizontal: 4
    },
    box: {
        marginTop: 10,
        marginBottom: 0,
        padding: 0,
        paddingBottom: 10,
        backgroundColor: '#2b3036',
        borderColor: '#2b3036',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5
    },
    sourceName: {
        fontSize: 20,
        color: '#d4d2cd',
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 5
    },
    sourceText: {
        color: '#d4d2cd',
        marginLeft: 5
    },
    url: {
        color: 'salmon',
        marginTop: 15,
        marginLeft: 5,
        textDecorationLine: 'underline'
    }
});