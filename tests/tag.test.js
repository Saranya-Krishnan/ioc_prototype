import React from 'react';
import Tag from '../views/src/components/tag';
import {mount} from 'enzyme'

test('A tag displays its keyword', () => {
    const wrapper = mount(
        <Tag
            word={'testing'}
            id={'123'}
            isEditable={false}
        />
    );
    const c = wrapper.find('.tag-label');
    expect(c.text()).toBe('testing');
});

test('A tag is editable', () => {
    const wrapper = mount(
        <Tag
            word={'testing'}
            id={'123'}
            isEditable={true}
        />
    );
    const c = wrapper.find('.remove-tag-icon');
    expect(c).toBePresent;
});
