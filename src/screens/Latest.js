import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { API_KEY } from "@env"

export default function Latest() {
    const [newsData, setNewsData] = useState([]);

    const fetchNews = () => {
        fetch(`https://newsapi.org/v2/everything?q=suomi&sortBy=publishedAt&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setNewsData(data.articles))
            .catch(error => console.error(error));
    }

    useEffect(() => { fetchNews() }, [])

    const listSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: '#adadad', marginLeft: 1, marginRight: 1, marginTop: 10, marginBottom: 10 }} />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', }}>Whats new?</Text>
            <FlatList
                data={newsData}
                keyExtractor={item => item.url}
                renderItem={({ item }) => (
                    <View>
                        <View >
                            <Text style={{ fontSize: 13, color: '#aaa' }}>{new Date(item.publishedAt).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>{item.source.name}</Text>
                        </View>
                    </View>
                )}
                // tee itemseperator paremmin ja erikseen
                ItemSeparatorComponent={listSeparator}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#212838',
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
        marginRight: 2,
        marginLeft: 2,
        marginTop: 25
    },
});
