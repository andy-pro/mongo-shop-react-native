import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, ListView } from 'react-native'
import { getCategoryBySlug } from './utils'

const currency = '₴'

export default class Transactions extends Component {

  renderPurchase = purchase =>
    <View style={{
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, color: 'black'}}>
          {purchase.title}
          {purchase.amount &&
            <Text style={{color: '#1a6'}}>
              &nbsp;({purchase.amount})
            </Text>
          }
        </Text>
        <Text style={{fontSize: 16, color: 'red'}}>
          {purchase.cost} {currency}
        </Text>
      </View>

      <Text style={{fontStyle: 'italic'}}>
        {purchase.category && getCategoryBySlug(purchase.category, this.props.categories)}
      </Text>
    </View>


  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.props.purchases}
        renderRow={this.renderPurchase}
        enableEmptySections={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 15,
    // paddingVertical: 20
  }
})
