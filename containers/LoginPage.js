import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { firebase } from '../utils/firebase';
import { Constants } from 'expo';

export default class LoginPage extends Component {
    constructor() {
        super();

        this.state = {
            emailAddress: "",
            password: "",
            errMsg: ""
        };
    };

    tryLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.emailAddress, this.state.password)
            .catch(err => {
                this.setState({errMsg: err.message})
            });
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.loginPage} behavior="padding" enabled>
                <Text style={styles.logo}>Babysitter</Text>
                
                <Text style={styles.formTitle}>Log In</Text>
                <View>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput style={styles.formInput} textContentType="emailAddress" value={this.state.emailAddress} onChangeText={text => this.setState({emailAddress: text})} multiline />
                </View>

                <View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} multiline />
                </View>

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Log In" onPress={this.tryLogin.bind(this)} />
            </KeyboardAvoidingView>
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

    loginPage: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: Constants.statusBarHeight,
        backgroundColor: "lightblue"
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
        width: 0.7 * Dimensions.get("window"),
        fontSize: 17
    },

    errMsg: {
        fontSize: 15,
        color: "red",
        textAlign: "center"
    }
});
