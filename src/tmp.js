var Accordion = require('react-native-accordion');

var YourComponent = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(_.range(25)),
    };
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow() {
    var header = (
      <View style={...}>
        <Text>Click to Expand</Text>
      </View>
    );

    var content = (
      <View style={...}>
        <Text>This content is hidden in the accordion</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }
});





      <View style={styles.container}>

        <Text style={styles.welcome}>
          Welcome to React Native!
          Andy Pro! Oksy Pro! Maximus Pro!!!
        </Text>

        <Text style={{ fontSize:22 }}>Only image clickable</Text>

        <TouchableHighlight style={ styles.imageContainer }>
          <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
        </TouchableHighlight>

        <Button
          onPress={searchUser}
          title="Learn More"
          color="#6464aa"
        />

        <TouchableOpacity
          onPress={searchPurchases}
          style={ styles.imageContainer }>
          <Image style={ styles.image } source={{ uri: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg' }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={searchPurchases}
          style={ styles.button }>
          <Text>Test TEXT</Text>
        </TouchableOpacity>

        <ScrollView>
          <Text style={styles.instructions}>
            To get started, edit index.android.js
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>

          <View style={{flex: 1, paddingTop: 22}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>}
            />
          </View>

          <Counters addFn={addNewCounter}>
            {renderCounters(counters, decrement, increment, incrementWithDelay)}
          </Counters>
        </ScrollView>



      </View>
