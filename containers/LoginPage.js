import React, {Component} from 'React';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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

    handleInputChange(inputType, value) {
        this.setState({[inputType]: value})
    };

    render() {
        return (
            <View style={styles.loginPage}>
                <Text>please dont do cocaine ey cocaine ruin your brain ey</Text>

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput textContentType="emailAddress" value={this.state.emailAddress} onChange={event => {this.handleInputChange("emailAddress", event.target.value)}} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput textContentType="password" secureTextEntry={true} value={this.state.password} onChange={event => {this.handleInputChange("password", event.target.value)}} />

                <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                <Button title="Log In" onPress={this.tryLogin.bind(this)} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    loginPage: {
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
