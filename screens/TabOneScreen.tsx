import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';
import store from '../store';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = store.getState();

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
      );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      //console.log(token)
      if(store.getState().token == null || store.getState().token != token){
        store.dispatch({ type: 'TOKEN', value: token }); 
      }

    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    //this.currentUser = await firebase.auth().currentUser;
    await this.registerForPushNotificationsAsync();
  }
  
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
  onMessage = e => {
    //console.log(e)
    var data = JSON.parse(e.nativeEvent.data);
    //console.log(data)
    if(store.getState().userId == null && typeof(data) != "undefined"){
      store.dispatch({ type: 'USERID', value: data.user_id });      
      store.dispatch({ type: 'TOKENDB', value: data.token });      
    }
    if(store.getState().token != store.getState().tokenDB){
      
      //atualiza token no banco de dados
      let atualizaToken = fetch('https://www.izyjob.com.br/api/token-notificacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user_id":store.getState().userId,
          "token":store.getState().token['data'],
        }),
      });
      //console.log(atualizaToken)
    }    
  }

  render() {

    //quando o state e alterado no redux chama a funcao que muda a key e reseta a view
    store.subscribe(()=>{
      let newState = store.getState();
      if(this.state.key != newState.key){
        this.resetWebViewToInitialUrl()
      }      
    })
    return <WebView 
    key={ this.state.key }
    ref={(ref) => { global.webview = ref; }}
    source={{ uri: this.state.urlProfile }} 
    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
    onMessage={this.onMessage}
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
