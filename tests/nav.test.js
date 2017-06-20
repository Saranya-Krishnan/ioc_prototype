import React from 'react';
import Nav from '../views/src/components/nav';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'
import { Link } from 'react-router-dom';

test('it displays the correct navigation items', () =>{
    const clickTest = () => {
      return true;
    };
    const component = renderer.create(
        <MemoryRouter>
            <Nav activeItem={'test'} clickMenuItem={clickTest}></Nav>
        </MemoryRouter>
    );
    let c = component.toJSON();
    expect(c).toMatchSnapshot();
});