import { StyleSheet } from "react-native";

export const article = StyleSheet.create({
    box: {
      height: 220,
      marginBottom: 18,
      backgroundColor: '#eee',
      borderRadius: 4,
      marginHorizontal: 9,
    },
    imageContainer: {flex: 1},
    image: {
      flex: 1,
      borderRadius: 4,
      height: 300,
    },
    titleContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
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