import { Action, action } from "easy-peasy";

export interface StreamView {
  chatOpen: boolean;
  openChat: Action<StreamView>
  closeChat: Action<StreamView>
}

const streamView: StreamView = {
  chatOpen: true,
  openChat: action((state) => {
    state.chatOpen = true
  }),
  closeChat: action((state) => {
    state.chatOpen = false
  })
};

export default streamView;
