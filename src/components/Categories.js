import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Categories({ onCategorySelect }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Button mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('')} >All</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Business')} >Business</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Entertainment')} >Entertainment</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Health')} >Health</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Science')} >Science</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Sports')} >Sports</Button>
                <Button  mode="contained" textColor="white" buttonColor="salmon" style={styles.button} onPress={() => onCategorySelect('Technology')} >Technology</Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginRight: 2
    }
})