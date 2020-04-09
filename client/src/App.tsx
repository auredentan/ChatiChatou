import React from 'react';

import { StoreProvider } from 'easy-peasy';

import { store } from "store"
import { StreamView } from "views";

const App = () => {

  return (
    <StoreProvider store={store}>
      <StreamView />
    </StoreProvider>
  );
}

export default App;
