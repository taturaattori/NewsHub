import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { API_KEY } from "@env"

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
            {newsData.map(article => (
                <View key={article.url}>
                    <Text>{article.title}</Text>
                    <Text>{article.description}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#182647',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });