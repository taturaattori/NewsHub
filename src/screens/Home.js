import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { API_KEY } from "@env"
import moment from "moment/moment";
import { LinearGradient } from 'expo-linear-gradient';
import { article } from "../components/style";

export default function Home() {
    const [newsData, setNewsData] = useState([]);

    const fetchNews = () => {
        fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => setNewsData(data.articles))
            .catch(error => console.error(error));
    }

    useEffect(() => { fetchNews() }, [])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={newsData}
                keyExtractor={item => item.url}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={1} style={article.container}>
                        <Image
                            source={{
                                uri: item?.urlToImage,
                                cache: 'force-cache',
                            }}
                            resizeMode={'cover'}
                            style={article.image}
                        />
                        <LinearGradient
                            colors={['#0000', '#000A', '#000']}
                            style={article.titleContainer}>
                            <Text style={article.text}>{item?.title}</Text>
                            <Text style={article.timestamp}>
                                {moment(item.publishedAt).format('HH:MM DD, MMMM')}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        backgroundColor: '#212838'
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
    },
});
