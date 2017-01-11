import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  toolbar: {
    backgroundColor: '#18a06a',
    height: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height:128,
    width: 128,
    borderRadius: 64
  },
  button: {
    // height: 20,
    padding: 10,
    backgroundColor: '#aaaaff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  header: {
    backgroundColor: '#ddd',
    padding: 2
  },
  headerText: {
    fontSize: 20
  },
  content: {
    backgroundColor: '#aee',
    paddingLeft: 20,
    paddingVertical: 10
  }
})
