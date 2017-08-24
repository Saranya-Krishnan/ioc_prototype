import React from 'react';
import Color from '../views/src/components/color';
import {mount} from 'enzyme'

test('A white color is rendered and has black text', () => {
    const hexWhite  = "#FFFFFF";
    const lightWrapper = mount(
        <Color color={hexWhite}/>
    );
    const c = lightWrapper.find('h3');
    const style = c.get(0).style['_values'];
    expect(c.text()).toBe(hexWhite);
    expect(style.color).toBe('rgb(0, 0, 0)');
});

test('A black color is rendered and has white text', () => {
    const hexBlack  = "#000000";
    const lightWrapper = mount(
        <Color color={hexBlack}/>
    );
    const c = lightWrapper.find('h3');
    const style = c.get(0).style['_values'];
    expect(c.text()).toBe(hexBlack);
    expect(style.color).toBe('rgb(255, 255, 255)');
});