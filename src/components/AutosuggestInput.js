import React, { Component } from 'react';
import {
  TextInput,
  View,
  ListView,
  ScrollView,
  TouchableHighlight
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let _time_;

class AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.showList = false;
    this.state = {
      focus: false,
      query: props.value || '',
      dataSource: ds.cloneWithRows([])
    }
  }

  onChangeText = (query) => {
    // for debug
    // _time_ = new Date().getTime();
    let suggestions = query.length ?
      this.props.getSuggestions(this.props.inputList, query) : []
    // console.log(JSON.stringify(suggestions));
    this.showList = Boolean(suggestions.length)
    let dataSource = ds.cloneWithRows(suggestions)
    // for debug
    // console.log('Time mesaure: get suggestions - ', new Date().getTime() - _time_);
    this.setState({ query, dataSource });
  }

  renderSuggestion = (suggestion) =>
    <TouchableHighlight
      onPress={() => {
        const {onSelect} = this.props
        let query = this.props.getSuggestionValue(suggestion, this.state.query)
        onSelect && onSelect(suggestion, query)
        this.showList = false
        this.setState({ query })
      }}
      underlayColor='#aaa'>
      {this.props.renderSuggestion(suggestion, this.state.query)}
    </TouchableHighlight>

  onFocus = () => this.setState({ focus: true })

  onBlur = () => this.setState({ focus: false })

  render() {
    let {keyboardType, returnKeyType, placeholder, refInput, autoFocus, styles} = this.props
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType={keyboardType || 'default'}
          autoCapitalize="sentences"
          autoCorrect={true}
          onChangeText={this.onChangeText}
          placeholder={placeholder}
          style={styles.input}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus={autoFocus}
          value={this.state.query}
          ref={refInput}
          returnKeyType={returnKeyType || 'next'}
        />
        {(this.showList && this.state.focus) ?
          <View style={styles.suggestions}>
            <ListView
              dataSource={this.state.dataSource}
              keyboardShouldPersistTaps={true}
              enableEmptySections={true}
              renderRow={this.renderSuggestion} />
          </View>: null
        }
      </View>
    );
  }
}

export default AutoComplete;
