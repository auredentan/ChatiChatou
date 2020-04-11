import React from "react"

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

import { IconButton } from "@material-ui/core"
import { useStoreState, useStoreActions } from "hooks"

const Stream = () => {

    const chatIsOpen = useStoreState(state => state.streamView.chatOpen)
    const openChat = useStoreActions(actions => actions.streamView.openChat)

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div>
                CENTER
            </div>
            <div style={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "flex-end" }}>
                {!chatIsOpen && <IconButton onClick={() => openChat()}> <ChevronLeftIcon /> </IconButton>}
            </div>
        </div>
    )
}

export default Stream;