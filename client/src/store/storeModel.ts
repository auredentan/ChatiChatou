import userModel, { User } from "./user";
import streamView, { StreamView } from "./streamView";
import global, { Global } from "./global";

export interface StoreModel {
  global: Global;
  user: User;
  streamView: StreamView;
}

const storeModel: StoreModel = {
  global: global,
  user: userModel,
  streamView: streamView
};

export default storeModel;