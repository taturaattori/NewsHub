import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { NEWS_API_KEY } from "@env"
import moment from "moment/moment";
import { LinearGradient } from 'expo-linear-gradient';
import { article } from "../components/style";
import Categories from "../components/Categories";
import { createStackNavigator } from "@react-navigation/stack";
import Article from "./Article";

export function HomeScreen({ navigation }) {
    const [newsData, setNewsData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [category, setCategory] = useState('');

    const fetchNews = () => {
        setRefreshing(true);
        fetch(`https://newsapi.org/v2/top-headlines?language=en&category=${category}&apiKey=${NEWS_API_KEY}`)
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

    useEffect(() => { fetchNews() }, [category])

    const handleRefresh = useCallback(() => {
        fetchNews();
    }, [])

    const handleCategorySelect = (category) => {
        setCategory(category);
    };

    return (
        <View style={styles.container}>
            <Categories onCategorySelect={handleCategorySelect} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={newsData}
                keyExtractor={item => item.url}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={'white'} />
                }
                renderItem={({ item }) => (
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
                            colors={['#0000', '#000A', '#000']}
                            style={article.titleContainer}>
                            <Text style={article.text}>{item.title}</Text>
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

const Stack = createStackNavigator();

export default function Home() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Article" component={Article} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
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
