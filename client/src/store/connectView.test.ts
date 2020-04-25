import { createStore } from 'easy-peasy'

import connectViewState from "./connectView"

test('change tab', async () => {
    // arrange
    const store = createStore(connectViewState);

    // before
    expect(store.getState().choosenTab).toEqual(0);

    store.getActions().setTab(1);

    expect(store.getState().choosenTab).toEqual(1);
});

test('open SignIn', async () => {
    // arrange
    const store = createStore(connectViewState);

    // before
    expect(store.getState().isConnectModalOpen).toEqual(false);
    expect(store.getState().choosenTab).toEqual(0);

    store.getActions().openSignIn();

    expect(store.getState().choosenTab).toEqual(1);
    expect(store.getState().isConnectModalOpen).toEqual(true);
});

test('open SignUp', async () => {
    // arrange
    const store = createStore(connectViewState);

    // before
    expect(store.getState().isConnectModalOpen).toEqual(false);
    expect(store.getState().choosenTab).toEqual(0);

    store.getActions().openSignUp();

    expect(store.getState().choosenTab).toEqual(0);
    expect(store.getState().isConnectModalOpen).toEqual(true);
});