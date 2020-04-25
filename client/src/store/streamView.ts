import { Action, action } from "easy-peasy";

export enum StreamTabs {
  home = 0,
  video = 1,
  clips = 2,
  followers = 3
}
export interface StreamViewState {
  chatOpen: boolean;
  openChat: Action<StreamViewState>
  closeChat: Action<StreamViewState>

  selectedTab: StreamTabs
  setSelectedTab: Action<StreamViewState, StreamTabs>
}

const streamViewState: StreamViewState = {
  chatOpen: true,
  openChat: action((state) => {
    state.chatOpen = true
  }),
  closeChat: action((state) => {
    state.chatOpen = false
  }),

  selectedTab: StreamTabs.home,
  setSelectedTab: action((state, payload) => {
    state.selectedTab = payload
  })
};

export default streamViewState;
