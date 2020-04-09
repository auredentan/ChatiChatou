import React from "react"

import { StreamsListSidebar, Stream, Chat } from "components"

const StreamView = () => {
    return (
        <div>
            <StreamsListSidebar />
            <Stream />
            <Chat />
        </div>
    )
}

export default StreamView