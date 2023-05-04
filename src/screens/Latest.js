import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NEWS_API_KEY } from "@env"

export default function Latest() {
    const [newsData, setNewsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [country, setCountry] = useState('suomi');

    const countryOptions = [
        { label: 'Finland', value: 'suomi' },
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
    ]

    const fetchNews = () => {
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/everything?q=${country}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`)
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

    useEffect(() => { fetchNews() }, [country])

    const handleRefresh = useCallback(() => {
        fetchNews();
    });

    const listSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: 'salmon', marginLeft: 1, marginRight: 1, marginTop: 10, marginBottom: 10 }} />
        );
    }

    const listHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Whats new in?</Text>
                
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue) => {
                            setCountry(itemValue);
                            fetchNews();
                        }}
                        style={{ height: 70, width: 200, color: 'salmon', }}
                        dropdownIconColor={'salmon'}
                    >
                        {countryOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
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
                            <Text style={{ fontSize: 14, color: '#b5b5b5', marginTop: 5 }}>{item.source.name}</Text>
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
        backgroundColor: '#31373e',
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
