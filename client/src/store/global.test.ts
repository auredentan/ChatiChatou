import { createStore } from 'easy-peasy'

import globalState from "./global"

test('toggle sidebar', async () => {
    // arrange
    const store = createStore(globalState);

    // before
    expect(store.getState().leftSidebarIsOpen).toEqual(true);

    // act
    store.getActions().closeLeftSidebar();

    // assert
    expect(store.getState().leftSidebarIsOpen).toEqual(false);

    store.getActions().openLeftSidebar();

    expect(store.getState().leftSidebarIsOpen).toEqual(true);

});
