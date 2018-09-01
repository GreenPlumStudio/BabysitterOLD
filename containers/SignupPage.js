import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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
    };

    trySignup() {
        let emailAddress, password = this.state;

        if (password !== this.state.confirmPassword) {
            this.setState({errMsg: "Passwords do not match"});
            return;
        } else if (this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || emailAddress === "" || password === "" || this.state.confirmPassword === "") {
            this.setState({errMsg: "Please fill out all fields"});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then(() => {
                firestore.collection("users").doc(firebase.auth().currentUser.uid).set({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username
                });
            })
            .catch(err => {
                this.setState({errMsg: err.message});
            });
    };

    handleInputChange(inputType, value) {
        this.setState({[inputType]: value})
    };

    render() {
        return (
            <View style={styles.signupPage}>
                <Text>please dont do cocaine ey cocaine ruin your brain ey</Text>

                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput textContentType="givenName" value={this.state.firstName} onChange={event => {this.handleInputChange("firstName", event.target.value)}} />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput textContentType="familyName" value={this.state.lastName} onChange={event => {this.handleInputChange("lastName", event.target.value)}} />

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput textContentType="username" value={this.state.username} onChange={event => {this.handleInputChange("username", event.target.value)}} />

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput textContentType="emailAddress" value={this.state.emailAddress} onChange={event => {this.handleInputChange("emailAddress", event.target.value)}} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput textContentType="password" secureTextEntry={true} value={this.state.password} onChange={event => {this.handleInputChange("password", event.target.value)}} />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput textContentType="none" secureTextEntry={true} value={this.state.confirmPassword} onChange={event => {this.handleInputChange("confirmPassword", event.target.value)}} />

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Sign Up" onPress={this.trySignup.bind(this)} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    signupPage: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "baseline",
        marginTop: Constants.statusBarHeight,
        backgroundColor: "lightblue"
    },

    inputLabel: {
        fontSize: 20,
        color: "gray"
    },

    errMsg: {
        fontSize: 15,
        color: "red"
    }
});
