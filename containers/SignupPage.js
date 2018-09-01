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

        this.trySignup = this.trySignup.bind(this);
    };

    trySignup() {
        console.log(this.state.emailAddress + " " + this.state.password);

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({errMsg: "Passwords do not match"});
            return;
        } else if (this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || this.state.emailAddress === "" || this.state.password === "" || this.state.confirmPassword === "") {
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
                <TextInput textContentType="givenName" value={this.state.firstName} onChange={() => {this.handleInputChange("firstName", event.target.value)}} />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput textContentType="familyName" value={this.state.lastName} onChange={() => {this.handleInputChange("lastName", event.target.value)}} />

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput textContentType="username" value={this.state.username} onChange={() => {this.handleInputChange("username", event.target.value)}} />

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput textContentType="emailAddress" value={this.state.emailAddress} onChange={() => {this.handleInputChange("emailAddress", event.target.value)}} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput textContentType="password" secureTextEntry={true} value={this.state.password} onChange={() => {this.handleInputChange("password", event.target.value)}} />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput textContentType="none" secureTextEntry={true} value={this.state.confirmPassword} onChange={() => {this.handleInputChange("confirmPassword", event.target.value)}} />

                <Button title="Sign Up" onPress={this.trySignup} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    signupPage: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "stretch",
        marginTop: Constants.statusBarHeight
    },

    inputLabel: {

    }
});
