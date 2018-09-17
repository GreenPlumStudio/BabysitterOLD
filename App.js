import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput,TouchableOpacity } from 'react-native';
import { firebase, firestore } from './utils/firebase';
import { Constants } from 'expo';

import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import Messages from './containers/Messages';
import Reminders from './containers/Reminders';
import Routine from './containers/Routine';
import WelcomePage from './components/WelcomePage';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
      accountType: "",
      loginOrSignup: "login",
      currentPage: "Reminders",
      babysitterEmail: ""
    };

    this.backToChooseAccountType = this.backToChooseAccountType.bind(this);
    this.changeAccountType = this.changeAccountType.bind(this);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
      }
    });
  };

  changeAccountType(accountType) {
    this.setState({accountType});
  };

  signOut() {
    firebase.auth().signOut().then(() => {
      this.setState({user: undefined, accountType: "", loginOrSignup: "login"});
    }).catch(() => {
      alert("Sign out failed, please try again");
    });
  };

  addBabysitter() {
    firebase.auth().fetchProvidersForEmail(this.state.babysitterEmail)
    .then(providers => {
      if (providers.length === 0) {
        console.log("hah u got trolled")
      } else {
        providers
        firestore.collection("parentUsers").doc(firebase.auth().currentUser.uid/babySitters).update({
          providers: {
            "messages": {},
            "reminders": {},
            "babyInfo": {}
          }
      });
      }
    });
    
  }
  
  backToChooseAccountType() {
    this.setState({accountType: ""});
  };

  render() {
    let user = this.state.user;
    console.log(this.state);

    return (
      <View>
        {
          () => {
            if (!user) {
              if (this.state.accountType === "") {
                console.log(1);
                return (
                  <WelcomePage changeAccountType={this.changeAccountType} />
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
              <View>
        
                <View>
                  <View>
                    <Text>MESSAGES</Text>
                  </View>
                  <View>
                    <Text>REMINDERS</Text>
                  </View>
                  <View>
                    <Text>ROUTINE</Text>
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
        
                <View style={{height: 70}}>
                  <Text>this is the main page</Text>
                  <Button title="Sign Out" onPress={this.signOut.bind(this)} />
                  
                  <Text>add BabySitter Email</Text>
                  <TextInput value={this.state.babysitterEmail} onChangeText={text => this.setState({babysitterEmail: text})}/>
                  <Button title="Add Babysitter" onPress={this.addBabysitter} />
                </View>
                
              </View>
            );
          }
        }
      </View>
    );
  };

  render2() {
    let user = this.state.user;
    console.log(this.state);

    if (!user) {
      if (this.state.accountType === "") {
        console.log(1);
        return (
          <WelcomePage changeAccountType={this.changeAccountType} />
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
      <View>

        <View>
          <View>
            <Text>MESSAGES</Text>
          </View>
          <View>
            <Text>REMINDERS</Text>
          </View>
          <View>
            <Text>ROUTINE</Text>
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

        <View style={{height: 70}}>
          <Text>this is the main page</Text>
          <Button title="Sign Out" onPress={this.signOut.bind(this)} />
          
          <Text>add BabySitter Email</Text>
          <TextInput value={this.state.babysitterEmail} onChangeText={text => this.setState({babysitterEmail: text})}/>
          <Button title="Add Babysitter" onPress={this.addBabysitter} />
        </View>
        
      </View>
    );
  };
};

const styles = StyleSheet.create({
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
