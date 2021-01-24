import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  FlatList,
  Text,
} from 'react-native';


class ResultsScreen extends Component {
  constructor(props) {
    super(props);
  }

  _rowPressed(selectedPhoto) {
    const photo = this.props.photos.filter(
      (photo) => photo === selectedPhoto,
    )[0];
    this.props.navigator.push({
      title: photo.title,
      component: DetailScreen,
      passProps: {photo: photo},
    });
  }

  _renderRow({item}) {
    return (
      <TouchableHighlight underlayColor="transparent">
        <View style={styles.rowContainer}>
          <Image style={styles.image} source={{uri: item.url_m}} />
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    const {title, photos} = this.props.route.params;

    return (
      <View style={styles.root}>
        <Text style={{fontSize: 30, fontStyle: 'italic'}}>{title}</Text>
        <FlatList
          data={photos}
          renderItem={this._renderRow.bind(this)}
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 10,
  },
  rowContainer: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    height: 300,
    width: 400,
    borderRadius: 10,
  },
});

module.exports = ResultsScreen;
