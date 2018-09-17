import React, {Component} from 'React';
import { StyleSheet, Text, View, Button } from 'react-native';
import { firebase, firestore } from '../utils/firebase';
import ReminderModal from '../components/ReminderModal';
// import PopupDialog from 'react-native-popup-dialog';


export default class Reminders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            addReminder: false
        };
        this.addReminder = this.addReminder.bind(this);
    };

    addReminder(text) {
        firestore.collection("parentUsers").doc(firebase.auth().currentUser.uid).set({
            "test": text
        });
    }

    render() {
        return (
            <View>
                <Text>This be the fking reminders page ya betch lol</Text>
                <Text>hey</Text>
                <Button title="Add a Reminder" onPress={() => {this.popupDialog.show();}} />
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    styles={{position: 'relative'}}
                >
                    <ReminderModal addReminder={(text) => this.addReminder(text)}/>
                </PopupDialog> */}
            </View>
        );
    };

};
