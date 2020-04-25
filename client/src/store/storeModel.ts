import userModel, { User } from "./user";
import streamViewState, { StreamViewState } from "./streamView";
import globalState, { GlobalState } from "./global";

import { IUserService } from "services";
import connectViewState, { ConnectViewState } from './connectView';

export interface Injections {
  userService: IUserService
}

export interface StoreModel {
  globalState: GlobalState;
  user: User;

  streamViewState: StreamViewState;
  connectViewState: ConnectViewState
}

const storeModel: StoreModel = {
  globalState: globalState,
  user: userModel,

  streamViewState: streamViewState,
  connectViewState: connectViewState
};

export default storeModel;