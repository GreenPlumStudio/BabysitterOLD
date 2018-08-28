import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { firebase, firestore } from './utils/firebase';
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user_logged_in: false
    };
  };

  render() {
    if (!this.state.user_logged_in) {
      return (
        !this.state.user_logged_in &&
          <View style={styles.container}>
            <Text>login!</Text>
          </View>
      )
    }
    
    return (
      this.state.user_logged_in &&
        <View style={styles.container}>
          <Text>Testing Git</Text>
          <Text>Junha Kim</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  }
});
 