import React, { Component } from 'react';
import { AppRegistry, Text, Button, View } from 'react-native';

export default class HelloWorldApp extends Component {
    render() {
        onPressLearnMore = () =>{
          console.log('hiu')
        };
        return (
            <View>
              <Text>hi</Text>
              <Button
                onPress={onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('MobileIoC', () => HelloWorldApp);