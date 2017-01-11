import React, { PropTypes } from 'react'
import { Button } from 'react-native';

const MyButton = (props) => {

  return (
    <Button
      onPress={props.onClick}
      title={props.children}
      color="#64aa64"
    />
  )
}

MyButton.PropTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MyButton
