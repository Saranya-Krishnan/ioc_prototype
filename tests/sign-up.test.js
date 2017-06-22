
import React from 'react';
import SignUp from '../views/src/components/sign-up-form';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

test('it displays the sign up form', () =>{
    const clickTest = () => {
        return true;
    };
    const component = renderer.create(
        <MemoryRouter>
            <SignUp clickFooterItem={'test'} Item={clickTest}></SignUp>
        </MemoryRouter>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});