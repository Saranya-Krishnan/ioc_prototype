import React, { Component } from 'react';
import { AppRegistry, Button, View } from 'react-native';
import TextTest  from './components/text-test';
export default class MobileIoC extends Component {
    render() {
        onPressLearnMore = () =>{
          console.log('hiu')
        };
        return (
            <View>
                <TextTest></TextTest>
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
AppRegistry.registerComponent('MobileIoC', () => MobileIoC);