import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Categories({ onCategorySelect }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Button mode="contained" textColor="grey" buttonColor="white" onPress={() => onCategorySelect('')} >All</Button>
                <Button mode="outlined" textColor="white" onPress={() => onCategorySelect('business')} >Business</Button>
                <Button mode="outlined" onPress={() => onCategorySelect('entertainment')} >Entertainment</Button>
                <Button mode="outlined" onPress={() => onCategorySelect('health')} >Health</Button>
                <Button mode="outlined" onPress={() => onCategorySelect('science')} >Science</Button>
                <Button mode="outlined" onPress={() => onCategorySelect('sports')} >Sports</Button>
                <Button mode="outlined" onPress={() => onCategorySelect('technology')} >Technology</Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
})