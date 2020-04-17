import { Action, action, Thunk, thunk } from "easy-peasy"

import { Channel } from "./channel"
import { Injections, StoreModel } from "./storeModel";
import { ILoginData } from "services/userService"

interface UserPreferences {
  darkMode: boolean
}
const baseUserPreferences: UserPreferences = {
  darkMode: JSON.parse(localStorage.getItem("darkMode") || 'false')
}

export interface User {
  isAuthenticated: boolean
  loading: boolean
  name: string | undefined
  preferences: UserPreferences
  followedChannels: Array<Channel> | undefined

  changeDarkMode: Action<User>
  setUser: Action<User, any>
  logout: Action<User>

  register: Thunk<User, ILoginData, Injections, any>
  login: Thunk<User, ILoginData, Injections, any>
  getMe: Thunk<User, any, Injections, StoreModel>
}

const user: User = {
  isAuthenticated: false,
  loading: true,
  name: 'anonymous',
  preferences: baseUserPreferences,
  followedChannels: undefined,

  // Actions
  changeDarkMode: action((state) => {
    state.preferences.darkMode = !state.preferences.darkMode
    localStorage.setItem("darkMode", JSON.stringify(!state.preferences.darkMode))
  }),
  setUser: action((state, payload) => {
    state.isAuthenticated = true
    state.followedChannels = payload.followedChannels
    state.name = payload.name
  }),
  logout: action((state) => {
    state.isAuthenticated = false
  }),


  register: thunk(async (actions, payload, { injections }) => {
    const { userService } = injections
    const { data, status } = await userService.register(payload)
    if (status === 200) {
      actions.login(payload)
    }
  }),
  login: thunk(async (actions, payload, { injections }) => {
    const { userService } = injections
    const { data, status } = await userService.login(payload)
    if (status === 200) {
      actions.getMe()
    }
  }),
  getMe: thunk(async (actions, payload, { injections, getStoreActions }) => {
    const { userService } = injections
    const { data: user, status } = await userService.getMe()
    if (status === 200) {
      actions.setUser(user)
    }
    getStoreActions().globalState.setInitialLoading(false)
  })

};

export default user;
