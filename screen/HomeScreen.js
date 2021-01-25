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
import DataManager from '../FlickerDataManager';
import {saveData, readData} from '../Storage';
import React, {Component} from 'react';
import {StackActions} from '@react-navigation/native';
import appConstant from '../app-constant';
import SnackBar from '../snackbar';

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

  DisplaySnackBar = () => {
    this.refs.ReactNativeSnackBar.ShowSnackBarFunction(
      'YOU ARE OFFLINE',
      'warning',
    );
  };

  // Event handlers
  async _onPressSearch() {
    const url = DataManager.urlForSearchtext(this.state.searchText);
    this.setState({isLoading: true});
    try {
      const photos = await DataManager.executeFetchRequest(url);
      this.setState({isLoading: false});
      const pushAction = StackActions.push('Result', {
        title: this.state.searchText + ' Photos',
        photos,
      });

      this.props.navigation.dispatch(pushAction);
    } catch (error) {
      this._handleError(appConstant.error_msg, () => this._onPressSearch());
    }
  }

  _handleError(msg, onRetry = () => {}) {
    this.DisplaySnackBar();
  }

  // set page and sate
  _populatePhotos(photos, page) {
    this.setState(({photos: prevPhotos}) => ({
      isLoading: false,
      photos: [...prevPhotos, ...photos],
      page,
    }));
  }
  //  fetch page
  async fetchPages(page, readFromDB = false) {
    const url = DataManager.urlForInteresting(page);
    this.setState({isLoading: true});
    try {
      const photos = await DataManager.executeFetchRequest(url);
      this._populatePhotos(photos, page);
      if (page === 1) {
        saveData(appConstant.storage_keys.photos, {photos}).then(() => {});
      }
    } catch (error) {
      this._handleError(appConstant.error_msg, () =>
        this.fetchPages(page, readFromDB),
      );

      if (readFromDB) {
        readData(appConstant.storage_keys.photos).then((photos) => {
          if (photos) {
            this._populatePhotos(photos.photos, 1);
          }
        });
      }
    }
  }

  // Lifecycle
  async componentDidMount() {
    this.fetchPages(this.state.page, true);
  }

  componentWillUnmount() {}

  _renderRow({item}) {
    return (
      <TouchableHighlight underlayColor="transparent">
        <View style={styles.rowContainer}>
          <Image style={styles.rowImage} source={{uri: item.url_m}}></Image>
        </View>
      </TouchableHighlight>
    );
  }
  //  handle infinite page
  handleEnd() {
    this.fetchPages(this.state.page + 1);
  }
  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" color="red" />
    ) : null;
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
            <SnackBar ref="ReactNativeSnackBar" />
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
  },
  topContainer: {
    margin: 1,
    borderRadius: 10,

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
  },
  listContainer: {
    flex: 3,
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
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowImage: {
    backgroundColor: 'rgba(0,0,0,.3)',

    height: 300,
    width: 400,
    borderRadius: 10,
  },
});

module.exports = SearchScreen;
