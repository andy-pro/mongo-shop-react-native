import React, { Component, PropTypes } from 'react'
import {
  BackAndroid,
  ToolbarAndroid,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  // Button,
  ListView,
  ScrollView,
  Easing,
  Navigator
} from 'react-native'

// import { Container, Content, Button, Icon, Fab } from 'native-base';

// import Accordion from 'react-native-accordion'

// import Collapsible from 'react-native-collapsible'
// import Accordion from 'react-native-collapsible/Accordion'

import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Ionicons';

import { Counters, Counter, RoundButton } from './../../components'
import * as actions from './actions'
import api from './../api';

import Transactions from './../transactions';

import NewTransactionScene from './../transactions/newTransaction'
// import AutocompleteExample from './../transactions/autoComplete2';

import Categories from './../categories';

import styles from './styles'

import mockData from './mockData'

const hello = () => {
  Alert.alert('Привет Ксю и Максим!')
}

const searchUser = id => api.getUser(id)

const getUserData = id => api.getUserData(id)

const getPurchases = id => api.getPurchases(id)

const renderCounters = (counters, decrement, increment, incrementWithDelay) => {
  return Object.keys(counters).map((id) => {
    const value = counters[id]
    return (
      <Counter
        key={id}
        decrementFn={() => decrement(id)}
        incrementFn={() => increment(id)}
        incrementWithDelayFn={() => incrementWithDelay(id)}>
        {value}
      </Counter>
    )
  })
}

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

let _time_;

const routes = [
  { title: 'Transactions', name: 'transactions' },
  { title: 'Single expense', name: 'newTransaction' },
  { title: 'Categories', name: 'categories' }
]

class Main extends Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      user: {
        id: '5856ffa4da7d1f056c935686',
        firstName: 'No',
        lastName: 'name'
      },
      purchases: this._getDataSource([]),
      categories: [],
      // newTransactionType: props.newTransactionType
      // transactionFormVisible: true
    };

    console.log('start app');
    _time_ = new Date().getTime();
    // console.log('request to server: ', new Date().getTime() - _time_);
  }

  componentWillMount() {
    // getUserData(this.state.user.id).then(this._setUserData)
    this._setUserData(mockData)
  }

  _setUserData = (data) =>
    this.setState({
      user: data[0],
      categories: data[0].categories,
      purchases: this._getDataSource(data[1])
    })

  _clearPurchases = () =>
    this.setState({
      purchases: this._getDataSource([])
    })

  _getPurchases = () => {
    getPurchases(this.state.user.id)
      .then(data => {
        this.setState({
          purchases: this._getDataSource(data)
        })
      })
  }

  _getDataSource = data =>
    this.dataSource.cloneWithRows(data)

  //
  // showTransactionForm = () =>
  //   this.setState({
  //     transactionFormVisible: true
  //   })
  //
  // hideTransactionForm = () =>
  //   this.setState({
  //     transactionFormVisible: false
  //   })

  RouteMapper = (route, navigationOperations, onComponentRef) => {
    _navigator = navigationOperations;

    const onTransacionsActionSelected = position => {
      switch (position) {
        case 0:
          this._clearPurchases()
          break;
        case 1:
          this._getPurchases()
          break;
        case 2:
          navigationOperations.push(routes[2]);
          break;
      }
    }

    if (route.name === 'transactions') {
      return (
        <View style={{flex: 1}}>

          <Ionicons.ToolbarAndroid
            navIconName="md-menu"
            style={styles.toolbar}
            titleColor="white"
            title={route.title}
            actions={[
              {title: 'Clear', show: 'never'},
              {title: 'Refresh', show: 'never'},
              {title: 'Categories', show: 'never'}
            ]}
            onActionSelected={onTransacionsActionSelected}
          />

          <Transactions
            purchases={this.state.purchases}
            categories={this.state.categories}
          />

          <RoundButton onClick={() => {
            navigationOperations.push(routes[1]);
          }} />

        </View>
      )
    }

    else if (route.name === 'categories') {
      return (
        <View style={{flex: 1}}>
          <Ionicons.ToolbarAndroid
            navIconName="md-arrow-back"
            onIconClicked={navigationOperations.pop}
            style={styles.toolbar}
            titleColor="white"
            title={route.title} />
          <ScrollView>
            <Categories categories={this.state.categories} />
          </ScrollView>
        </View>
      )
    }

    else if (route.name === 'newTransaction') {
      return (
        <NewTransactionScene
          categories={this.state.categories}
          newTransactionType={this.props.newTransactionType}
          setTransactionType={this.props.setTransactionType}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          route={route}
        />
      )
    }

  }

  render() {
    const {
      addNewCounter,
      counters,
      decrement,
      increment,
      incrementWithDelay
    } = this.props

    return (
      <Navigator
        style={styles.container}
        initialRoute={routes[0]}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.RouteMapper}
      />
    )
  }

}

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.

// Main.propTypes = {
//   addNewCounter: PropTypes.func.isRequired,
//   counters: PropTypes.object.isRequired,
//   increment: PropTypes.func.isRequired,
//   decrement: PropTypes.func.isRequired,
//   incrementWithDelay: PropTypes.func.isRequired
// }

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(
  (state) => {
    console.log('connect', JSON.stringify(state.app));
    return {
      counters: state.app.counters,
      newTransactionType: state.app.newTransactionType
    }
  },
  // (state) => ({
  //   counters: state.app.counters,
  //   newTransactionType: state.app.newTransactionType
  // }),
  (dispatch) => ({
    setTransactionType: (t) => dispatch(actions.setTransactionType(t)),
    addNewCounter: () => dispatch(actions.newCounter()),
    increment: (id) => dispatch(actions.increment(id)),
    decrement: (id) => dispatch(actions.decrement(id)),
    incrementWithDelay: (id) => dispatch(actions.incrementWithDelay(id))
  })
)(Main)
