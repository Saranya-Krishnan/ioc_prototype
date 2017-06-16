import React from 'react';
import Nav from '../views/src/components/nav';
import renderer from 'react-test-renderer';


test('it displays the correct navigation items', () =>{
    const component = renderer.create(
        <Nav/>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});