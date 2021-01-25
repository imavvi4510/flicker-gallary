/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import AppConstants from './app-constant';
import appConstant from './app-constant';

class SnackBar extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(50);
    this.ShowSnackBar = false;
    this.HideSnackBar = true;
    this.state = {
      SnackBarInsideMsgHolder: '',
      snackType: 'success',
    };
  }

  ShowSnackBarFunction(
    SnackBarInsideMsgHolder = 'Default SnackBar Message...',
    snackType = 'success',
    duration = 3000,
  ) {
    if (this.ShowSnackBar === false) {
      this.setState({
        SnackBarInsideMsgHolder: SnackBarInsideMsgHolder,
        snackType,
      });

      this.ShowSnackBar = true;

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400,
      }).start(this.hide(duration));
    }
  }

  hide = (duration) => {
    this.timerID = setTimeout(() => {
      if (this.HideSnackBar === true) {
        this.HideSnackBar = false;

        Animated.timing(this.animatedValue, {
          toValue: 50,
          duration: 400,
        }).start(() => {
          this.HideSnackBar = true;
          this.ShowSnackBar = false;
          clearTimeout(this.timerID);
        });
      }
    }, 10000);
  };

  SnackBarCloseFunction = () => {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false;
      clearTimeout(this.timerID);

      Animated.timing(this.animatedValue, {
        toValue: 50,
        duration: 400,
        useNativeDriver: false, // Add this line
      }).start(() => {
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
      });
    }
  };

  render() {
    const {snackType, SnackBarInsideMsgHolder} = this.state;
    return (
      <Animated.View
        style={[
          {transform: [{translateY: this.animatedValue}]},
          styles.SnackBarContainter,
          styles[snackType],
        ]}>
        <Text numberOfLines={1} style={styles.SnackBarMessage}>
          {SnackBarInsideMsgHolder}
        </Text>

        <Text
          style={styles.SnackBarUndoText}
          onPress={this.SnackBarCloseFunction}>
          {' '}
          {appConstant.error_msg}{' '}
        </Text>
      </Animated.View>
    );
  }
}

export default SnackBar;

const styles = StyleSheet.create({
  SnackBarContainter: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
    bottom: 0,
    right: 0,
    height: 50,
    paddingLeft: 10,
    paddingRight: 55,
  },

  SnackBarMessage: {
    color: '#fff',
    fontSize: 18,
  },

  success: {
    backgroundColor: '#009688',
  },
  warning: {
    backgroundColor: 'yellow',
  },
  error: {
    backgroundColor: 'red',
  },

  SnackBarUndoText: {
    color: appConstant.scank_color_1,
    fontSize: 18,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    padding: 5,
  },
});
