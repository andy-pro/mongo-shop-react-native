import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 35,
    backgroundColor: '#18a06a',
    width: 70,
    height: 70,
    opacity: 0.8,
    paddingTop: 5,
    zIndex: 2
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    textShadowColor: 'black'
  }
});

const RoundButton = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onClick}
      underlayColor='#084'
      style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableHighlight>
  )
}

export default RoundButton
