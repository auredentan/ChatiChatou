import React from 'react';

import { StoreProvider } from 'easy-peasy';

import { store } from "store"
import { StreamView } from "views";
import TopNavBar from 'components/TopNavBar';

const App = () => {

  return (
    <StoreProvider store={store}>
      <TopNavBar />
      <div>
        <StreamView />
      </div>
    </StoreProvider>
  );
}

export default App;
