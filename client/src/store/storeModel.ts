import userModel, { User } from "./user";
import streamView, { StreamView } from "./streamView";
import globalState, { Global } from "./global";

import { IUserService } from "services";

export interface Injections {
  userService: IUserService
}

export interface StoreModel {
  globalState: Global;
  user: User;
  streamView: StreamView;
}

const storeModel: StoreModel = {
  globalState: globalState,
  user: userModel,
  streamView: streamView
};

export default storeModel;