import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { firebase } from './utils/firebase';
import { Constants } from 'expo';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Messages from './containers/Messages';
import Reminders from './containers/Reminders';
import Routine from './containers/Routine';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
      loginOrSignup: "login",
      currentPage: "Messages"
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  };

  render() {
    let user = this.state.user;

    if (!user) {
      if (this.state.loginOrSignup === "login") {
        return (
          <View style={styles.loginSignupPage}>
            <LoginPage />
            <Button title="Don't have an account? Sign up here" onPress={() => { this.setState( {loginOrSignup: "signup"} ) }} />
          </View>
        );
      }

      return (
        <View style={styles.loginSignupPage}>
          <SignupPage />
          <Button title="Already have an account? Log in here" onPress={() => { this.setState( {loginOrSignup: "login"} ) }} />
        </View>
      );
    }
    
    return (
      <View style={styles.mainPage}>
        <View style={{height: 50}}>
          <Text>this is the main page</Text>
        </View>
        <View style={styles.navBar}>
          <View style={styles.navButton}>
            <Text style={styles.navButtonLabel}>MESSAGES</Text>
          </View>
          <View style={styles.navButton}>
            <Text style={styles.navButtonLabel}>REMINDERS</Text>
          </View>
          <View style={styles.navButton}>
            <Text style={styles.navButtonLabel}>ROUTINE</Text>
          </View>
        </View>
        <View>
          {
            this.state.currentPage === "Messages" &&
              <Messages user={user} />
          }
          {
            this.state.currentPage === "Reminders" &&
              <Reminders user={user} />
          }
          {
            this.state.currentPage === "Routine" &&
              <Routine user={user} />
          }
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  loginSignupPage: {
    flex: 1,
    flexGrow: 1
  },

  mainPage: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },

  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    maxHeight: 50
  },

  navButton: {
    padding: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#89CFF0",
    width: Dimensions.get("window").width / 3
  },

  navButtonLabel: {
    color: "#89CFF0",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "bottom"
  }
});
