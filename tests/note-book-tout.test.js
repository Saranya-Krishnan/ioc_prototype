import React from 'react';
import NoteBookTout from '../views/src/components/note-book-tout';
import {mount} from 'enzyme'
const img = require('!!url-loader!../../assets/img/notebook_basic.jpg');

test('Renders an active book', () => {
    const wrapper = mount(
        <NoteBookTout
            name={"Test Notebook"}
            linkToNotebook={"/1"}
            id={"123"}
            isActive={true}/>
    );
    const c = wrapper.find('.description');
    expect(c.text()).toBe('Current Notebook');
});


test('Renders an inactive book', () => {

});
