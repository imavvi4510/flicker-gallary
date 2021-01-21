import React, {useState} from 'react';
import {Button, Text, StyleSheet, StatusBar, View} from 'react-native';

const HelloWorldApp = () => {
  const styleTypes = ['default', 'dark-content', 'light-content'];
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

  const changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar);
  };

  const changeStyleStatusBar = () => {
    const styleId = styleTypes.indexOf(styleStatusBar) + 1;

    if (styleId === styleTypes.length) {
      return setStyleStatusBar(styleTypes[0]);
    }
    return setStyleStatusBar(styleTypes[styleId]);
  };

  return (
    <View
    // style={styles.container}>
    >
      <View>
        <Text>StatusBar Style: {styleStatusBar}</Text>
        <Text>
          StatusBar Visibility: {!visibleStatusBar ? 'Visible' : 'Hidden'}
        </Text>
      </View>
      <StatusBar backgroundColor="red" />
      <View>
        <StatusBar hidden={visibleStatusBar} />
      </View>
      <View>
        <Button
          title="Toggle StatusBar"
          onPress={() => changeVisibilityStatusBar()}
        />
      </View>
      <View>
        <Button
          title="Change StatusBar Style"
          onPress={() => changeStyleStatusBar()}
        />
      </View>
    </View>
  );
};

export default HelloWorldApp;
