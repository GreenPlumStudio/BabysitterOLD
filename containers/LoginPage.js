import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput, Dimensions,  } from 'react-native';
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
            <View style={styles.loginPage}>
                <Text style={styles.logo}>Babysitter</Text>

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput style={styles.formInput} textContentType="emailAddress" value={this.state.emailAddress} onChangeText={text => this.setState({emailAddress: text})} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.formInput} textContentType="password" secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({password: text})} />

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Log In" onPress={this.tryLogin.bind(this)} />
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

    loginPage: {
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
