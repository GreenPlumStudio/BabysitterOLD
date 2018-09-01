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

        this.tryLogin = this.tryLogin.bind(this);
    };

    tryLogin() {
        console.log(this.state.emailAddress + " " + this.state.password);

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
                <TextInput textContentType="emailAddress" value={this.state.emailAddress} onChange={() => {this.handleInputChange("emailAddress", event.target.value)}} />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput textContentType="password" secureTextEntry={true} value={this.state.password} onChange={() => {this.handleInputChange("password", event.target.value)}} />

                <Button title="Log In" onPress={this.tryLogin} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "stretch",
        marginTop: Constants.statusBarHeight
    },

    inputLabel: {
        
    }
});
