import userModel, { User } from "./user";
import streamView, { StreamView } from "./streamView";
import globalState, { Global } from "./global";

import { IUserService } from "services";
import connectView, { ConnectView } from './connectView';

export interface Injections {
  userService: IUserService
}

export interface StoreModel {
  globalState: Global;
  user: User;

  streamView: StreamView;
  connectView: ConnectView
}

const storeModel: StoreModel = {
  globalState: globalState,
  user: userModel,

  streamView: streamView,
  connectView: connectView
};

export default storeModel;