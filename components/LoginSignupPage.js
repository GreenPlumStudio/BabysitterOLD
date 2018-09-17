import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Constants } from 'expo';

const LoginSignupPage = (props) => {
    return (
        <View style={styles.loginSignupPage}>
            <TouchableOpacity style={styles.backButton} onPress={props.backToChooseAccountType}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <LoginPage accountType={this.state.accountType} />
            
            <Button title="Don't have an account? Sign up here" onPress={() => { this.setState( {loginOrSignup: "signup"} ) }} />
        </View>
    );
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
    }
});

export default LoginSignupPage;
