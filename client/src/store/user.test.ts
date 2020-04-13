import { createStore } from 'easy-peasy'

import user from "./user"

test('change dark mode', async () => {
    // arrange
    const store = createStore(user);

    // before
    expect(store.getState().preferences.darkMode).toEqual(false);

    // act
    store.getActions().changeDarkMode();

    // assert
    expect(store.getState().preferences.darkMode).toEqual(true);
});

