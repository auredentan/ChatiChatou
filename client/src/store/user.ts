import { Thunk, thunk, Action, action } from "easy-peasy"

import { Channel } from "./channel"

interface UserPreferences {
  darkMode: boolean
}
const baseUserPreferences: UserPreferences = {
  darkMode: false
}

export interface User {
  preferences: UserPreferences,
  followedChannels: Array<Channel> | undefined

  changeDarkMode: Action<User>
  setFollowedChannels: Action<User, Array<Channel> | undefined>

  fetchFollowedChannels: Thunk<User>
}

const user: User = {
  preferences: baseUserPreferences,
  followedChannels: undefined,

  changeDarkMode: action((state) => {state.preferences.darkMode = !state.preferences.darkMode}),
  setFollowedChannels: action((state, payload) => {
    state.followedChannels = payload
  }),

  fetchFollowedChannels: thunk(async (actions) => {
    const followedChannels = [
      { name: 'test1', avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/91e7b44f-d4e8-4121-a19c-e9266358a08a-profile_image-70x70.png', currentViewerCount: 20, currentStreamSection: "WoW", isOnline: true },
      { name: 'test2', avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/91e7b44f-d4e8-4121-a19c-e9266358a08a-profile_image-70x70.png', currentViewerCount: 0, currentStreamSection: "LoL", isOnline: false }
    ]
    actions.setFollowedChannels(followedChannels)
  })
};

export default user;
