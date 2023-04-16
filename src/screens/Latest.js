import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { API_KEY } from "@env"

export default function Latest() {
    const [newsData, setNewsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNews = () => {
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/everything?q=suomi&sortBy=publishedAt&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setNewsData(data.articles);
                setRefreshing(false);
            })
            .catch(error => {
                console.error(error)
                setRefreshing(false);
            });
    }

    useEffect(() => { fetchNews() }, [])

    const handleRefresh = useCallback(() => {
        fetchNews();
    });

    const listSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: '#adadad', marginLeft: 1, marginRight: 1, marginTop: 10, marginBottom: 10 }} />
        );
    }

    const listHeader = () => {
        return (
            <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Whats new?</Text>
                {listSeparator()}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={newsData}
                keyExtractor={item => item.url}
                ListHeaderComponent={listHeader}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={'white'} />
                }
                renderItem={({ item }) => (
                    <View>
                        <View >
                            <Text style={{ fontSize: 13, color: '#aaa' }}>{new Date(item.publishedAt).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, color: '#555', marginTop: 5 }}>{item.source.name}</Text>
                        </View>
                    </View>
                )}
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
        marginTop: 15
    },
});
