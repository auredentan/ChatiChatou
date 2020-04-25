import { Action, action } from "easy-peasy"

export interface GlobalState {
    initialLoading: boolean
    setInitialLoading: Action<GlobalState, boolean>

    leftSidebarIsOpen: boolean
    closeLeftSidebar: Action<GlobalState>
    openLeftSidebar: Action<GlobalState>
}

const globalState: GlobalState = {
    initialLoading: true,
    setInitialLoading: action((state, payload) => { state.initialLoading = payload }),

    leftSidebarIsOpen: true,
    closeLeftSidebar: action((state) => { state.leftSidebarIsOpen = false }),
    openLeftSidebar: action((state) => { state.leftSidebarIsOpen = true })
};

export default globalState;
