
import React from 'react';
import SignIn from '../views/src/components/sign-in-form';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

test('it displays the sign in form', () =>{
    const clickTest = () => {
        return true;
    };
    const component = renderer.create(
        <MemoryRouter>
            <SignIn onClickSubmit={function(){return 'test';}} Item={clickTest}></SignIn>
        </MemoryRouter>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});