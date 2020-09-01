import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';
import store from '../store';

export default class App extends React.Component {
  state = store.getState();  
  resetWebViewToInitialUrl = () => {
    this.setState({
      keyVagas: this.state.keyVagas + 1
    });
  };
  render() {
    //quando o state e alterado no redux chama a funcao que muda a key e reseta a view
    store.subscribe(()=>{
      let newState = store.getState();
      if(this.state.keyVagas != newState.keyVagas){
        this.resetWebViewToInitialUrl()
      }      
    })
    return <WebView 
    key={ this.state.keyVagas }
    ref={(ref) => { global.webview2 = ref; }}
    source={{ uri: 'https://www.izyjob.com.br/vagas' }}
    onMessage={(ref) => console.log('ds')} 
    style={{ marginTop: 0 }} 
    />;
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
