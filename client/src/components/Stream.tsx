import React from "react"

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import { IconButton } from "@material-ui/core"
import { useStoreState, useStoreActions } from "hooks"
import { stat } from "fs"

const Stream = () => {

    const sidebarIsOpen = useStoreState(state => state.global.streamSidebarIsOpen)
    const openSidebar = useStoreActions(state => state.global.openStreamSidebar)

    const chatIsOpen = useStoreState(state => state.stream.chatOpen)
    const openChat = useStoreActions(actions => actions.stream.openChat)

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "flex-start" }}>
                {!sidebarIsOpen && <IconButton onClick={() => openSidebar()}> <ChevronRightIcon /> </IconButton>}
            </div>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "flex-end" }}>
                {!chatIsOpen && <IconButton onClick={() => openChat()}> <ChevronLeftIcon /> </IconButton>}
            </div>
        </div>
    )
}

export default Stream;