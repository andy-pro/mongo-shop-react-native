import React, { Component, PropTypes } from 'react'
import { View, Text, ListView, TouchableHighlight, Alert } from 'react-native'

const ROOT_PATH = 'categories'

export default class Categories extends Component {

  render() {
    let categories = this.props.categories
    return (
      <View>
        {categories && createList(categories, ROOT_PATH)}
      </View>
    )
  }

}

const createList = (data, _path) =>
  <View>
    {data.map((item, i) => {
      let path = _path + '.' + i
      return (
        <TouchableHighlight
          onPress={() => _pressRow(item, path)}
          underlayColor="#eee"
          key={path}>
          <View style={{paddingLeft: 20}}>
            <Text style={{paddingVertical: 5, fontSize: 16}}>
              {item.title}
            </Text>
            {(item.sub && item.sub.length) && createList(item.sub, path + '.sub')}
          </View>
        </TouchableHighlight>
      )
    })}
  </View>


const _pressRow = (item, path) => {
  Alert.alert('Category', item.title + ', ' + path)
}
