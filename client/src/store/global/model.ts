import { Action, action } from "easy-peasy";

export interface GlobalModel {
    streamSidebarIsOpen: boolean;
    openStreamSidebar: Action<GlobalModel>
    closeStreamSidebar: Action<GlobalModel>
}

const globalModel: GlobalModel = {
    streamSidebarIsOpen: true,
    openStreamSidebar: action((state) => {
        state.streamSidebarIsOpen = true
    }),
    closeStreamSidebar: action((state) => {
        state.streamSidebarIsOpen = false
    })
};

export default globalModel;
