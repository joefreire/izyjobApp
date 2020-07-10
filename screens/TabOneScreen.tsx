import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';
import perfilStore from '../store';


export default class App extends React.Component {
  state = perfilStore.getState();

  
  resetWebViewToInitialUrl = () => {
    this.setState({
      key: this.state.key + 1
    });
  };
  _onNavigationStateChange(webViewState){
    if(webViewState.url != this.state.url){
      //this.resetWebViewToInitialUrl()
    }
  }

  render() {
    console.log(this.state)
    return <WebView 
    key={ this.state.key }
    ref={(ref) => { global.webview = ref; }}
    source={{ uri: this.state.urlProfile }} 
    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
    style={{ marginTop: 0 }} />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
