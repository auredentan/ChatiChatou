import React, { useEffect } from "react"
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from "@material-ui/core"
import { useStoreState, useStoreActions } from "hooks"

const FollowedChannelsList = () => {

    const followedChannels = useStoreState(state => state.user.followedChannels)
    const fetchFollowedChannels = useStoreActions(actions => actions.user.fetchFollowedChannels)

    useEffect(() => {
        if (!followedChannels) {
            fetchFollowedChannels()
        }
    }, [])

    return (
        <List>
            {followedChannels && followedChannels.map((channel: any) => {
                return (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={channel.avatarUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={channel.name} secondary={channel.currentStreamSection} />
                        <ListItemSecondaryAction>
                            <div style={{ backgroundColor: 'red',  marginRight: '8px', display: 'inline-block', height: '0.8rem', width: '0.8rem', borderRadius: '50%' }}></div>{channel.currentViewerCount}
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default FollowedChannelsList;