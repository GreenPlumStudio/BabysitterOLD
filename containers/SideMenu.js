import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native';

export default class SideMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            percent: new Animated.Value(0),
            grayout: false
        };

        this.showSideMenu = this.showSideMenu.bind(this);
    };

    componentDidMount() {
        this.halfWidth = Dimensions.get('window').width * 0.5;
    };

    showSideMenu() {
        Animated.timing(this.state.percent, {
			toValue: 1,
			duration: 70,
			easing: Easing.ease
		}).start();

		this.setState({
			grayout: true
		});
    };

    hideSideMenu() {
		Animated.timing(this.state.percent, {
			toValue: 0,
			duration: 50,
			easing: Easing.ease
		}).start();

		this.setState({
			grayout: false
		});
    };
    
    render() {
        return (
            <View style={styles.sideMenu}>
                <Button title="SHOW" onPress={this.showSideMenu} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    sideMenu: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
