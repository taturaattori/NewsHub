import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { NEWS_API_KEY } from "@env"
import moment from "moment/moment";
import { LinearGradient } from 'expo-linear-gradient';
import { article } from "../components/style";
import { createStackNavigator } from "@react-navigation/stack";
import Article from "./Article";
import { Searchbar } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { color } from "@rneui/base";

export default function Search({ navigation }) {
    const [newsData, setNewsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [keyword, setKeyword] = useState('');


    const fetchNews = () => {
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${NEWS_API_KEY}`)
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

    const handleRefresh = useCallback(() => {
        fetchNews();
    }, [keyword])

    const onChangeSearch = query => setKeyword(query);

    return(
        <View style={styles.container}>
            <Searchbar placeholder="Search" value={keyword} onChangeText={onChangeSearch} onIconPress={fetchNews}/>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={newsData}
                keyExtractor={item => item.url}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={'white'} />
                }
                renderItem={({ item }) => (
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
                            colors={['#0000', '#0000', '#000A', '#000A','black']}
                            style={article.titleContainer}>
                            <Text style={article.text}>{item.title}</Text>
                            <Text style={article.timestamp}>
                                {moment(item.publishedAt).format('HH:MM DD, MMMM')}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View>
                    <Text style={styles.emptyList}>What would you like to read?</Text>
                    <Ionicons name="md-search" size={70} style={styles.icon}/>
                    </View>
                }
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
    },
    emptyList: {
        marginTop: 100,
        textAlign: 'center',
        fontSize: 16,
        color: '#d4d2cd',
        fontWeight: 'bold',
    },
    icon: {
        alignSelf: 'center',
        color: '#d4d2cd',
        marginTop: 10
    }
});
