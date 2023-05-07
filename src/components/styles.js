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
      fontWeight: '400',
      lineHeight: 24,
      color: '#fff',
      paddingBottom: 22,
    },
    timestamp: {
      position: 'absolute',
      color: '#eee',
      fontSize: 12,
      fontWeight: '300',
      right: 16,
      bottom: 6,
    },
  });

export const menu = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31373e'
  },
  top: {
    flexDirection: 'row',
    position: 'absolute',
    top: 15
  },
  menuButton: {
    width: '101%',
    backgroundColor: '#31373e',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 0,
    flexDirection: 'row'
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'salmon'
  },
  items: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 60
  }
})

export const userInput = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31373e'
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'salmon'
  },
  input: {
    borderWidth: 1,
    borderColor: 'salmon',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: 'white'
  },
  error: {
    marginBottom: 20,
    color: 'white',
  },
  button: {
    marginVertical: 10
  }
});