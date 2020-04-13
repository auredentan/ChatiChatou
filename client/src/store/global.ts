import { Action, action } from "easy-peasy"

export interface Global {
    leftSidebarIsOpen: boolean
    initialLoading: boolean

    setInitialLoading: Action<Global, boolean>
    closeLeftSidebar: Action<Global>
    openLeftSidebar: Action<Global>
}

const globalState: Global = {
    leftSidebarIsOpen: true,
    initialLoading: true,

    setInitialLoading: action((state, payload) => { state.initialLoading = payload }),
    closeLeftSidebar: action((state) => { state.leftSidebarIsOpen = false }),
    openLeftSidebar: action((state) => { state.leftSidebarIsOpen = true })
};

export default globalState;
