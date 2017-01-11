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

const initialState = {
  title: '',
  category: '',
  amount: '',
  cost: ''
}

export default class TransactionForm extends Component {

  fields = {}
  state = initialState

  amountTypes = ['кг', 'г', 'шт', 'м.п.']

  onChange = data => this.setState(data)

  render() {
    // console.log('sugg render!!!');
    return (
      <View style={{
        padding: 5,
        borderBottomColor: '#18a06a',
        borderBottomWidth: 2
      }}>

        <AutosuggestInput
          placeholder='Type a transaction title'
          formField='title'
          value={this.state.title}
          onChange={this.onChange}
          inputList={this.props.categories}
          getSuggestionValue={suggestion => suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, 1)}
          renderSuggestion={renderCategory}
          onSelect={suggestion => {
            this.setState({
              category: suggestion.path_str.trim().replace(/\s*\/$/, '')
            })
            this.fields.amount.focus()
          }}
          focusOnSelect={false}
          autoFocus={true}
          styles={autoSuggestStyles}
        />

        <AutosuggestInput
          placeholder='Type a transaction category'
          formField='category'
          value={this.state.category}
          onChange={this.onChange}
          inputList={this.props.categories}
          getSuggestionValue={suggestion => suggestion.path_str + suggestion.title}
          getSuggestions={(list, query) => getSuggestions(list, query, -1)}
          renderSuggestion={renderCategory}
          styles={autoSuggestStyles}
        />

        <View style={{flexDirection: 'row'}}>

          <AutosuggestInput
            placeholder='Amount'
            formField='amount'
            value={this.state.amount}
            onChange={this.onChange}
            inputList={this.amountTypes}
            getSuggestionValue={(suggestion, query) => query + suggestion}
            getSuggestions={(list, query) =>
              query.charCodeAt(query.length - 1) === 32 ? list : []
            }
            renderSuggestion={renderAmount}
            onSelect={() => this.fields.cost.focus()}
            styles={{...autoSuggestStyles, container: styles.flex}}
            refInput={c => this.fields.amount = c}
            keyboardType='numeric'
          />
          <View style={styles.flex}>
            <TextInput
              placeholder="Cost"
              value={this.state.cost}
              onChangeText={q => this.onChange({cost: q})}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={c => this.fields.cost = c}
              keyboardType='numeric'
              returnKeyType='done'
            />
          </View>

        </View>

        <View style={styles.controls}>
          <Icon.Button name="md-close-circle" backgroundColor="#3b5998">
            Close
          </Icon.Button>
          <Text> </Text>
          <Icon.Button name="md-send" backgroundColor="#3b9859"
            onPress={() => {
              Alert.alert('formData',
              this.state.title +
              this.state.category +
              this.state.amount +
              this.state.cost
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
    <View style={styles.suggestionView}>
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
  <View style={[styles.suggestionView, {alignItems: 'flex-end'}]}>
    <Text style={styles.suggestion}>
      {amountType}
    </Text>
  </View>

const styles = StyleSheet.create({

  suggestions: {
    backgroundColor: '#eee',
    maxHeight: 148,
    marginHorizontal: 4,
    borderColor: '#09d',
    borderWidth: 1
  },
  suggestionView: {
    borderWidth: 1,
    borderColor: '#ddd'
  },
  suggestion: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  highlight: {
    color: 'red'
  },

  input: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inline: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1
  }
});

const autoSuggestStyles =  {
  input: styles.input,
  suggestions: styles.suggestions
}
