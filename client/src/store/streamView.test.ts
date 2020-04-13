import { createStore } from 'easy-peasy'

import streamView from "./streamView"

test('toggle sidebar', async () => {
    // arrange
    const store = createStore(streamView);

    // before
    expect(store.getState().chatOpen).toEqual(true);

    // act
    store.getActions().closeChat();

    // assert
    expect(store.getState().chatOpen).toEqual(false);

    store.getActions().openChat();

    expect(store.getState().chatOpen).toEqual(true);

});
