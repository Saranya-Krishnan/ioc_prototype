import React from 'react';
import Artwork from '../views/src/components/artwork';
import {render} from 'enzyme'
jest.dontMock('../views/src/components/artwork');
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const middlewares = [];
const mockStore = configureStore(middlewares);

test('setUser sets a user', () => {
    const temp = function(){
      return true;
    };
    const userFake = {
        userInfo: {
            id: 'not set'
        }
    };
    const initialState = {
        user: userFake
    };
    const store = mockStore(initialState);
    const wrapper = render(
        <Provider store={store}>
           <Artwork
               loadArtwork={temp}
               getSuggestions={temp}
               browseBasedOnThis={temp}
               relatedToMe={temp}
               moreLikeThis={temp}
               userNameClicked={temp}
               workId={'345'}
           />
        </Provider>
    );
});