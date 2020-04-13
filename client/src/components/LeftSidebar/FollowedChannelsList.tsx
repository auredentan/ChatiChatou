import React, { useEffect } from "react"
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from "@material-ui/core"
import { useStoreState, useStoreActions } from "hooks"
import { useHistory } from "react-router-dom"

const FollowedChannelsList = () => {

    const leftSidebarIsOpen = useStoreState(state => state.globalState.leftSidebarIsOpen)

    const followedChannels = useStoreState(state => state.user.followedChannels)

    console.log(followedChannels)

    const history = useHistory()

    return (
        <List>
            {(followedChannels && followedChannels.length > 0) && followedChannels.map((channel: any) => {
                return (
                    <ListItem key={channel.name} button onClick={() => history.push(`/${channel.name}`)} disabled={!channel.isOnline}>
                        <ListItemAvatar>
                            <Avatar src={channel.avatarUrl} />
                        </ListItemAvatar>
                        {leftSidebarIsOpen &&
                            <>
                                <ListItemText primary={channel.name} secondary={channel.currentStreamSection} />
                                <ListItemSecondaryAction >
                                    {channel.isOnline ? (<><div style={{ backgroundColor: 'red', marginRight: '8px', display: 'inline-block', height: '0.8rem', width: '0.8rem', borderRadius: '50%' }}></div>{channel.currentViewerCount}</>) : <ListItem disabled={true}>Offline</ListItem>
                                    }
                                </ListItemSecondaryAction>
                            </>
                        }
                    </ListItem>
                )
            })}
        </List>
    )
}

export default FollowedChannelsList;