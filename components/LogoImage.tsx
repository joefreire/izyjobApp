import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

export default class LogoImage extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri:
              'https://www.izyjob.com.br/images/logoMin.jpg',
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
            marginTop: 5,
          }}
        />
      </View>
    );
  }
}