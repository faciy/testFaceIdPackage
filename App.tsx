import React from 'react';
import {View, Text, TouchableHighlight, Alert} from 'react-native';
import TouchID from 'react-native-touch-id';

const App = () => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    color: 'blue',
    fallbackLabel: 'Show Passcode',
  };
  const pressHandler = () => {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then((success: any) => {
        console.log("success",success);
        
        Alert.alert('Authenticated Successfully', success);
      })
      .catch((error: any) => {
        Alert.alert('Authentication Failed', error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableHighlight
        style={{backgroundColor: 'red', padding: 10, borderRadius: 5}}
        onPress={pressHandler}>
        <Text style={{color: 'white'}}>Authenticate with Touch ID</Text>
      </TouchableHighlight>
    </View>
  );
};

export default App;
