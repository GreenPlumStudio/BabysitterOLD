import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from 'react-native';
import { firebase, firestore } from '../utils/firebase';
import { Constants } from 'expo';

export default class LoginPage extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            errMsg: ""
        };

        this.trySignup = this.trySignup.bind(this);
    };

    trySignup() {
        let emailAddress, password, confirmPassword = this.state;

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({errMsg: ("Passwords do not Match")});
            

            return;
        } else if (this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || emailAddress === "" || password === "" || this.state.confirmPassword === "") {
            this.setState({errMsg: "Please fill out all fields"});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.emailAddress, this.state.password)
            .then(() => {
                firestore.collection("users").doc(firebase.auth().currentUser.uid).set({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username
                });
            })
            .catch(err => {
                console.log(this.state.emailAddress);
                this.setState({errMsg: err.message});
            });
    };

    render() {
        return (
            <View style={styles.signupPage}>
                <Text style={styles.logo}>Babysitter</Text>

                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput style={styles.formInput} textContentType="givenName" value={this.state.firstName} onChangeText={text => this.setState({firstName: text})} />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput style={styles.formInput} textContentType="familyName" value={this.state.lastName} onChangeText={text => this.setState({lastName: text})} />

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput style={styles.formInput} textContentType="username" value={this.state.username} onChangeText={text => this.setState({username: text})} />

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput style={styles.formInput} textContentType="emailAddress" value={this.state.emailAddress} onChangeText={text => this.setState({emailAddress: text})} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.confirmPassword} onChangeText={text => this.setState({confirmPassword: text})} />

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Sign Up" onPress={this.trySignup} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    logo: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 70,
        fontWeight: "700",
        color: "cornflowerblue"
    },

    signupPage: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: Constants.statusBarHeight,
        backgroundColor: "lightblue"
    },

    inputLabel: {
        fontSize: 20,
        color: "darkcyan",
        fontWeight: "500",
        width: 0.7 * Dimensions.get("window").width,
        textAlign: "left",
        maxHeight: 30
    },

    formInput: {
        width: 0.7 * Dimensions.get("window").width,
        maxHeight: 30
    },

    errMsg: {
        fontSize: 15,
        color: "red",
        maxHeight: 30
    }
});
