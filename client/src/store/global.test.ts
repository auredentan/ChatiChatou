import { createStore } from 'easy-peasy';

import globalState from './global';

test('test close and open sidebar', async () => {
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

test('set initial loading', async () => {
	// arrange
	const store = createStore(globalState);

	// before
	expect(store.getState().initialLoading).toEqual(true);

	// act
	store.getActions().setInitialLoading(false);

	// assert
	expect(store.getState().initialLoading).toEqual(false);
});
