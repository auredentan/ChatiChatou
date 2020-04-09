import userModel, { UserModel } from "./user/model";
import streamModel, { StreamModel } from "./stream/model";
import globalModel, { GlobalModel } from "./global/model";

export interface StoreModel {
  global: GlobalModel,
  user: UserModel;
  stream: StreamModel;
}

const storeModel: StoreModel = {
  global: globalModel,
  user: userModel,
  stream: streamModel
};

export default storeModel;