import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {
  executeFetchRequest,
  urlForSearchtext,
  urlForInteresting,
} from './DataManager';
import {saveData} from './Storage';
import React, {Component} from 'react';
import {StackActions} from '@react-navigation/native';
const ResultsScreen = require('./ResultsScreen');

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'Summer',
      isLoading: false,
      photos: [],
      page: 1,
    };
  }

  // Event handlers
  _onPressSearch() {
    console.log('ghhh');
    const url = urlForSearchtext(this.state.searchText);
    this.setState({isLoading: true});
    executeFetchRequest(url, (photos) => {
      this.setState({isLoading: false});
      const pushAction = StackActions.push('Result', {
        title: this.state.searchText + ' Photos',
        photos,
      });

      this.props.navigation.dispatch(pushAction);
    });
  }

  fetchPages(page, readFromDB = false) {
    const url = urlForInteresting(page);
    this.setState({isLoading: true});
    executeFetchRequest(
      url,
      (photos) => {
        this.setState(({photos: prevPhotos}) => ({
          isLoading: false,
          photos: [...prevPhotos, ...photos],
          page,
        }));
      },
      readFromDB,
    );
  }

  // _onPressRow(selectedPhoto) {
  //   const photo = this.state.photos.filter(
  //     (photo) => photo === selectedPhoto,
  //   )[0];
  //   this.props.navigator.push({
  //     title: photo.title,
  //     component: DetailScreen,
  //     passProps: {photo: photo},
  //   });
  // }

  // Lifecycle
  async componentDidMount() {
    this.fetchPages(this.state.page, true);
  }
  componentWillUnmount() {
    saveData(this.state.photos.slice(0, 10)).then(() => {});
  }

  _renderRow({item}) {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        // onPress={() => this._onPressRow(item)}
      >
        <View style={styles.rowContainer}>
          <Image style={styles.rowImage} source={{uri: item.url_m}}></Image>
        </View>
      </TouchableHighlight>
    );
  }
  handleEnd() {
    this.fetchPages(this.state.page + 1);
  }
  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" color="red" />
    ) : (
      <View>
        <Text></Text>
      </View>
    );
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={styles.screenTitle}>Search</Text>
          <TextInput
            style={styles.textInput}
            placeholder='"Anything"'
            onChangeText={(searchText) => this.setState({searchText})}
          />
          <TouchableHighlight
            style={styles.searchButton}
            onPress={this._onPressSearch.bind(this)}
            underlayColor="#007AFF">
            <Text style={styles.buttonText}>GO</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.imagesTitle}>Popular Images</Text>
            <FlatList
              data={this.state.photos}
              renderItem={this._renderRow.bind(this)}
              horizontal={false}
              automaticallyAdjustContentInsets={false}
              enableEmptySections={true}
              onEndReached={() => this.handleEnd()}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              ListFooterComponent={() => (
                <ActivityIndicator size={50} color="red" animating />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
  },
  topContainer: {
    margin: 1,
    borderRadius: 10,
    // flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 2,
    flexDirection: 'row',
  },
  screenTitle: {
    fontSize: 20,
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#4A4A4A',
  },
  textInput: {
    fontSize: 20,
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#007AFF',
    marginTop: 1,
    height: 64,
    width: 300,
  },
  searchButton: {
    marginTop: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    height: 40,
    width: 64,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    paddingRight: 10,
    // backgroundColor: 'red',
  },
  listContainer: {
    flex: 3,
    // backgroundColor: 'green',
  },
  imagesTitle: {
    fontSize: 20,
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    color: '#4A4A4A',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  rowContainer: {
    // flex: 3,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowImage: {
    backgroundColor: 'rgba(0,0,0,.3)',
    // flex: 1,
    height: 300,
    width: 400,
    borderRadius: 10,
  },
});

module.exports = SearchScreen;
