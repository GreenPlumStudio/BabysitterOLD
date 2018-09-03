import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, ScrollView } from 'react-native';
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
        if (this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || this.state.emailAddress === "" || this.state.password === "" || this.state.confirmPassword === "") {
            this.setState({errMsg: "Please fill out all fields"});
            return;
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({errMsg: ("Passwords do not match")});
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

                <Text style={styles.formTitle}>Sign Up</Text>
                <ScrollView contentContainerStyle={styles.signupForm}>
                    <View>
                        <View>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <TextInput style={styles.formInput} textContentType="givenName" value={this.state.firstName} onChangeText={text => this.setState({firstName: text})} />
                        </View>

                        <View>
                            <Text style={styles.inputLabel}>Last Name</Text>
                            <TextInput style={styles.formInput} textContentType="familyName" value={this.state.lastName} onChangeText={text => this.setState({lastName: text})} />
                        </View>
                        
                        <View>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TextInput style={styles.formInput} textContentType="username" value={this.state.username} onChangeText={text => this.setState({username: text})} />
                        </View>

                        <View>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput style={styles.formInput} textContentType="emailAddress" value={this.state.emailAddress} onChangeText={text => this.setState({emailAddress: text})} />
                        </View>

                        <View>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />
                        </View>

                        <View>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.confirmPassword} onChangeText={text => this.setState({confirmPassword: text})} />
                        </View>
                    </View>
                </ScrollView>

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Sign Up" onPress={this.trySignup} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    logo: {
        marginTop: 30,
        marginBottom: 5,
        fontSize: 50,
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

    signupForm: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },

    formTitle: {
        fontSize: 30,
        fontWeight: "500",
        color: "dodgerblue",
        marginBottom: 15
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
        fontSize: 17
    },

    errMsg: {
        fontSize: 15,
        color: "red",
        textAlign: "center"
    }
});
