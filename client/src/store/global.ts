import { Action, action } from "easy-peasy"

export interface Global {
    leftSidebarIsOpen: boolean

    closeLeftSidebar: Action<Global>
    openLeftSidebar: Action<Global>
}

const global: Global = {
    leftSidebarIsOpen: true,

    closeLeftSidebar: action((state) => { state.leftSidebarIsOpen = false }),
    openLeftSidebar: action((state) => { state.leftSidebarIsOpen = true })
};

export default global;
