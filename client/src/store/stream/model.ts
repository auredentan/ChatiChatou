import { Action, action } from "easy-peasy";

export interface StreamModel {
  chatOpen: boolean;
  openChat: Action<StreamModel>
  closeChat: Action<StreamModel>
}

const streamModel: StreamModel = {
  chatOpen: true,
  openChat: action((state) => {
    state.chatOpen = true
  }),
  closeChat: action((state) => {
    state.chatOpen = false
  })
};

export default streamModel;
