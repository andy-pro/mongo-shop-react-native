import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  View,
  ListView,
  ScrollView,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import { AutosuggestInput } from './../../components'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

import Icon from 'react-native-vector-icons/Ionicons';

export default class TransactionForm extends Component {

  amountTypes = ['кг', 'г', 'шт', 'м.п.']
  fields = {}

  render() {
    // console.log('sugg render!!!');
    return (
      <View style={{
        padding: 5,
        borderBottomColor: '#18a06a',
        borderBottomWidth: 2
      }}>

        <AutosuggestInput
          onChange={this.onChange}
          inputList={this.props.categories}
          placeholder='Type a transaction title'
          refInput={c => this.fields.title = c}
          getSuggestionValue={suggestion => suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, 1)}
          renderSuggestion={renderCategory}
          onSelect={suggestion => {
            this.fields.category.setNativeProps({
              text: suggestion.path_str.trim().replace(/\s*\/$/, '')
            });
            this.fields.amount.focus()
          }}
          focusOnSelect={false}
          autoFocus={true}
          styles={autoSuggestStyles}
        />

        <AutosuggestInput
          onChange={this.onChange}
          inputList={this.props.categories}
          placeholder='Type a transaction category'
          refInput={c => this.fields.category = c}
          getSuggestionValue={suggestion => suggestion.path_str + suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, -1)}
          renderSuggestion={renderCategory}
          styles={autoSuggestStyles}
        />

        <View style={{flexDirection: 'row'}}>

          <AutosuggestInput
            onChange={this.onChange}
            inputList={this.amountTypes}
            placeholder='Amount'
            refInput={c => this.fields.amount = c}
            getSuggestionValue={(suggestion, query) => query + suggestion}
            getSuggestions={(list, query) =>
              query.charCodeAt(query.length - 1) === 32 ? list : []
            }
            renderSuggestion={renderAmount}
            styles={{...autoSuggestStyles, container: styles.flex}}
            keyboardType='numeric'
          />
          <View style={styles.flex}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Cost"
              style={styles.input}
              keyboardType='numeric'
              ref={c => this.fields.cost = c}
              returnKeyType='done'
            />
          </View>

        </View>

        <View style={styles.controls}>
          <Icon.Button name="md-close-circle" backgroundColor="#3b5998" onPress={this.props.onClose}>
            Close
          </Icon.Button>
          <Text> </Text>
          <Icon.Button name="md-send" backgroundColor="#3b9859"
            onPress={() => {
              Alert.alert('formData',
              this.fields.title._getText() +
              this.fields.category._getText() +
              this.fields.amount._getText() +
              this.fields.cost._getText()
            )
            }}>
            Submit
          </Icon.Button>
          <Text> </Text>
        </View>

      </View>
    )
  }
}

const getSuggestions = (inputList, query, order) => {
  // order: 1 - ascendant, -1 - descendant
  const inputValue = query.trim().toLowerCase(),
        inputLength = inputValue.length,
        suggestions = [];
  const createList = (data, path=[]) => {
    data.forEach((item, index) => {
      let title = item.title;
      if (title.toLowerCase().slice(0, inputLength) === inputValue) {
        suggestions.push({
          title,
          path,
          path_str: path.reduce((p, c) => p + c + ' / ', '')
        });
      }
      if (item.sub && item.sub.length) {
        createList(item.sub, path.concat([title]));
      }
    });
  }
  createList(inputList);
  return suggestions.sort((a, b) => (b.path.length - a.path.length)*order);
};

const renderCategory = (category, query) => {
  // const matches = AutosuggestHighlightMatch(suggestionText, query);
  const matches = [[0, query.length]];
  const parts = AutosuggestHighlightParse(category.title, matches);
  return (
    <View>
      <Text style={styles.suggestion}>
        {category.path_str}
        {
          parts.map((part, index) =>
            <Text
              style={part.highlight ? styles.highlight : null}
              key={index}>
              {part.text}
            </Text>
          )
        }
      </Text>
    </View>
  );
}

const renderAmount = amountType =>
  <View style={{alignItems: 'flex-end'}}>
    <Text style={styles.suggestion}>
      {amountType}
    </Text>
  </View>

const styles = StyleSheet.create({

  overley: {
    position: 'absolute',
    // backgroundColor: '#ade',
    // padding:10,
    top: 55,
    left: 0,
    right: 0,
    zIndex: 30,
    maxHeight: 150,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  container: {
    // position: 'absolute',

  },

  suggestions: {
    backgroundColor: '#ddd',
    maxHeight: 150,
    marginHorizontal: 4,
    // flexDirection: 'row',
    // padding: 10,
    borderColor: '#09d',
    borderWidth: 1
  },

  suggestion: {
    // position: 'absolute',
    // backgroundColor: '#ade',
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontWeight: 'bold'
    // fontSize: 15
    // top: 90,
    // left: 70,
    // zIndex: 30
  },
  highlight: {
    color: 'red'
  },

  input: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 3
    // borderColor: '#09d',
    // borderWidth: 1
    // flex: 1,
    // height: 45
  },
  controls: {
    // flex: 0,
    // height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // padding: 0
  },
  inline: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  flex: {
    flex: 1
  }
});

const autoSuggestStyles =  {
  input: styles.input,
  suggestions: styles.suggestions
}
