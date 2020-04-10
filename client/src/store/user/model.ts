import { Thunk, thunk, Action, action } from "easy-peasy"

import { ChannelModel } from "../channel/model"

export interface UserModel {
  followedChannels: Array<ChannelModel> | undefined

  setFollowedChannels: Action<UserModel, Array<ChannelModel> | undefined>

  fetchFollowedChannels: Thunk<UserModel>
}

const userModel: UserModel = {
  followedChannels: undefined,

  setFollowedChannels: action((state, payload) => {
    state.followedChannels = payload
  }),

  fetchFollowedChannels: thunk(async (actions) => {
    const followedChannels = [
      { name: 'test1', avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/91e7b44f-d4e8-4121-a19c-e9266358a08a-profile_image-70x70.png', currentViewerCount: 2, currentStreamSection: "WoW" },
      { name: 'test2', avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/91e7b44f-d4e8-4121-a19c-e9266358a08a-profile_image-70x70.png', currentViewerCount: 20, currentStreamSection: "LoL" }
    ]
    actions.setFollowedChannels(followedChannels)
  })
};

export default userModel;
