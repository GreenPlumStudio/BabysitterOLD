import React, {Component} from 'React';
import { StyleSheet, Text, View } from 'react-native';

export default class Reminders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    };

    render() {
        return (
            <View>
                <Text>This be the fking reminders page ya betch lol</Text>
            </View>
        );
    };
};
