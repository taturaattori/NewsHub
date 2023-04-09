import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { API_KEY } from "@env"
import moment from "moment/moment";
import {LinearGradient} from 'expo-linear-gradient';

export default function Home() {
    const [newsData, setNewsData] = useState([]);

    const fetchNews = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => setNewsData(data.articles))
        .catch(error => console.error(error));
    }

    useEffect(() => {fetchNews()}, [])

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={newsData}
                renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={1} style={styles.container}>
                    <Image
                        source={{
                            uri: item?.urlToImage,
                            cache: 'force-cache',
                        }}
                        resizeMode={'cover'}
                        style={news.image}
                    />
                    <LinearGradient
                        colors={['#0000', '#000A', '#000']}
                        style={news.titleContainer}>
                        <Text style={news.text}>{item?.title}</Text>
                        <Text style={news.timestamp}>
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
      paddingTop: 20
    },
    list: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 8,
      },
  });

const news = StyleSheet.create({
    container: {
      height: 240,
      marginBottom: 18,
      backgroundColor: '#eee',
      borderRadius: 24,
      marginHorizontal: 16,
    },
    imageContainer: {flex: 1},
    image: {
      flex: 1,
      borderRadius: 24,
      height: 300,
    },
    titleContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      height: 160,
      paddingLeft: 16,
      paddingRight: 10,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    text: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
      color: '#fff',
      paddingBottom: 24,
    },
    timestamp: {
      position: 'absolute',
      color: '#eee',
      fontSize: 12,
      fontWeight: '300',
      right: 16,
      bottom: 8,
    },
  });