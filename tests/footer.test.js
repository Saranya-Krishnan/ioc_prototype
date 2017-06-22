import React from 'react';
import Footer from '../views/src/components/footer';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

test('it displays the correct footer items', () =>{
    const clickTest = () => {
        return true;
    };
    const component = renderer.create(
        <MemoryRouter>
            <Footer clickFooterItem={'test'} Item={clickTest}></Footer>
        </MemoryRouter>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});