import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    return(
        <View style={styles.container}>
            <Text style={{color: 'white'}}>Home screen</Text>
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