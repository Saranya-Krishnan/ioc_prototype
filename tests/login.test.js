import React from 'react';
import Login from '../views/src/components/login';
import renderer from 'react-test-renderer';


test('it displays a name', () =>{
    const component = renderer.create(
        <Login user="Testing"/>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});