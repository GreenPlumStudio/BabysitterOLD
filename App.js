import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
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
      accountType: "",
      loginOrSignup: "login",
      currentPage: "Messages"
    };

    this.backToChooseAccountType = this.backToChooseAccountType.bind(this);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  };

  signOut() {
    firebase.auth().signOut().then(() => {
      this.setState({user: undefined, accountType: "", loginOrSignup: "login"});
    }).catch(() => {
      alert("Sign out failed, please try again");
    });
  };

  backToChooseAccountType() {
    this.setState({errMsg: "back to choose", accountType: ""})
  };

  render() {
    let user = this.state.user;

    if (!user) {
      if (this.state.accountType === "") {
        return (
          <View style={styles.welcomePage}>
            <Text style={styles.logo}>Babysitter</Text>

            <View style={{alignItems: "center", marginTop: 50}}>
              <Text style={{fontSize: 20, fontWeight: "300"}}>I am a...</Text>

              <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", maxHeight: 100}}>
                <TouchableOpacity style={{marginRight: 10, backgroundColor: "#2196F3", borderRadius: 2, elevation: 4}} onPress={() => { this.setState( {accountType: "parent"} ) }}>
                  <Text style={{color: "white", fontSize: 15, fontWeight: "500", padding: 8}}>Parent</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10, backgroundColor: "#2196F3", borderRadius: 2, elevation: 4}} onPress={() => { this.setState( {accountType: "babysitter"} ) }}>
                  <Text style={{color: "white", fontSize: 15, fontWeight: "500", padding: 8}}>Babysitter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }

      if (this.state.loginOrSignup === "login") {
        return (
          <View style={styles.loginSignupPage}>
            <TouchableOpacity style={styles.backButton} onPress={this.backToChooseAccountType}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <LoginPage accountType={this.state.accountType} />
            
            <Button title="Don't have an account? Sign up here" onPress={() => { this.setState( {loginOrSignup: "signup"} ) }} />
          </View>
        );
      }

      return (
        <View style={styles.loginSignupPage}>
          <TouchableOpacity style={styles.backButton} onPress={this.backToChooseAccountType}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <SignupPage accountType={this.state.accountType} />
          
          <Button title="Already have an account? Log in here" onPress={() => { this.setState( {loginOrSignup: "login"} ) }} />
        </View>
      );
    }
    
    return (
      <View style={styles.mainPage}>
        <View style={{height: 70}}>
          <Text>this is the main page</Text>
          <Button title="Sign Out" onPress={this.signOut.bind(this)} />
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
  welcomePage: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  
  logo: {
    marginBottom: 50,
    fontSize: 50,
    fontWeight: "700",
    color: "cornflowerblue",
    elevation: 2
  },

  loginSignupPage: {
    flex: 1,
    flexGrow: 1,
    marginTop: Constants.statusBarHeight
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    elevation: 4,
    zIndex: 1
  },

  backButtonText: {
    color: "gray",
    fontSize: 20,
    fontWeight: "500",
    padding: 8
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
