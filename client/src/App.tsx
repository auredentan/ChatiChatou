import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { HomeView, StreamView } from "views";
import { useStoreState, useStoreActions } from 'hooks';
import { LeftSidebar, TopNavBar } from 'components';

const App = () => {


  const darkMode = useStoreState(state => state.user.preferences.darkMode)

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );


  const getMe = useStoreActions(actions => actions.user.getMe)
  const initialLoading = useStoreState(state => state.globalState.initialLoading)
  useEffect(() => {
    if (getMe) {
      getMe()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {initialLoading && <>LOading ...</>}
      {!initialLoading &&
        <Router>
          <>
            <TopNavBar />
            <LeftSidebar />
            <Switch>
              <Route path="/discover">
                <div>Discover</div>
              </Route>
              <Route path="/followed">
                <div>Followed</div>
              </Route>
              <Route path="/:id">
                <StreamView />
              </Route>
              <Route path="/">
                <HomeView />
              </Route>
              <Route path="*">
                <div>No match</div>
              </Route>
            </Switch>
          </>
        </Router>
      }
    </ThemeProvider>
  );
}

export default App;
