import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import TransactionForm from './form'

const actions = [
  {title: 'Single expense', show: 'never'},
  {title: 'Expense list', show: 'never'},
  {title: 'Income', show: 'never'}
]

const NewTransactionScene = (props) =>
  <View style={{flex: 1}}>
    <Ionicons.ToolbarAndroid
      navIconName="md-arrow-back"
      onIconClicked={props.onIconClicked}
      style={props.style}
      titleColor="white"
      title={actions[props.newTransactionType].title}
      actions={actions}
      onActionSelected={props.setTransactionType}
    />
    <TransactionForm
      categories={props.categories}
    />
  </View>

export default NewTransactionScene
